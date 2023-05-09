import * as React from "react";
import { Box, Paper, Stack } from "@mui/material";
import { useState, useRef } from "react";
import IButton from "../../components/IButton";
import { AttendSituation, UserType } from "../../types";
import useUser from "../../hooks/useUser";
import { RemoveTypeFromBase64 } from "../../lib/Convert";

const videoSize = {
  width: 640,
  height: 360,
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Camera: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { user, setUser } = useUser();

  function handleCheckIn() {
    if (imgRef.current == null || isOpen === true) {
      return
    }
    const checkInImage = RemoveTypeFromBase64(imgRef.current.src);

    const formData = new FormData();
    formData.append('userId', (user as UserType).userId);
    formData.append('image', checkInImage as string);

    async function checkIn() {
      const res = await fetch('http://127.0.0.1:8000/face/home', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      })
      const data = await res.json();
      console.log('check in', data);
      if (data.code === 200) {
        setUser({
          ...user as UserType,
          status: AttendSituation.Checked,
        })
      } else {
        console.log('check in failed');
      }
    }

    checkIn();
  }

  function successFunc(mediaStream: MediaStream) {
    const video = videoRef.current as HTMLVideoElement;
    // 旧的浏览器可能没有srcObject
    if ("srcObject" in video) {
      video.srcObject = mediaStream;
    }
    video.onloadedmetadata = () => {
      video.play();
    };
  }

  function errorFunc(err: Error) {
    console.log(`${err.name}: ${err.message}`);
    // always check for errors at the end.
  }

  function openMedia() {
    if (isOpen) {
      return;
    }
    setIsOpen(true);

    const opt = {
      audio: false,
      video: videoSize,
    };
    navigator.mediaDevices.getUserMedia(opt).then(successFunc).catch(errorFunc);
  }

  function closeMedia() {
    if (isOpen === false) return
    setIsOpen(false);
    const video = videoRef.current as HTMLVideoElement;
    const stream = video.srcObject as MediaStream;
    if ("getTracks" in stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
    }
  }

  function getImg() {
    // 获取图片资源
    const video = videoRef.current as HTMLVideoElement;
    const canvas = canvasRef.current as HTMLCanvasElement;
    if (canvas == null) {
      return;
    }
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight); // 把视频中的一帧在canvas画布里面绘制出来
    const base64Img = canvas.toDataURL(); // 将图片资源转成字符串
    closeMedia(); // 获取到图片之后可以自动关闭摄像头
    return base64Img;
  }

  function saveImg() {
    const base64Image = getImg() as string;
    const img = imgRef.current as HTMLImageElement;  
    img.src = base64Image; 
  }
  
  

  return (
    <Paper
      elevation={1}
      sx={{
        width: "100%",
        height: 500,
        borderRadius: 2,
      }}
    >
      <Stack direction="column" position="relative">
        <Box
          component="div"
          sx={{
            width: "100%",
          }}
        >
          <video
            ref={videoRef}
            width={videoSize.width}
            height={videoSize.height}
            className={classNames(
              isOpen ? "" : "hidden",
              "mx-auto mt-8 rounded-lg"
            )}
          />
          <canvas
            ref={canvasRef}
            width={videoSize.width}
            height={videoSize.height}
            className={classNames(
              isOpen ? "hidden" : "",
              "mx-auto mt-8 rounded-lg"
            )}
          />
        </Box>
        <img
          ref={imgRef}
          src=""
          alt="imgTag"
          width={videoSize.width}
          height={videoSize.height}
          className="w-full hidden mx-auto mt-8 rounded-lg"
        />

        <Stack
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          sx={{
            mt: 5,
            px: 12,
          }}
        >
          <IButton onClick={openMedia}>打开摄像头</IButton>
          <IButton onClick={saveImg}>截图</IButton>
          <IButton onClick={handleCheckIn}>提交</IButton>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Camera;
