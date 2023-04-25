import { Box, Paper, Stack, Button, styled } from '@mui/material';
import { useState, useRef } from 'react';

const videoSize = {
  width: 640,
  height: 360,
};

const IButton = styled(Button)(() => ({
  width: 128,
  color: 'white',
  fontSize: 18,
  backgroundColor: '#4f46e5',
  ":hover": {
    backgroundColor: "#3730a3",
  }
}))

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Camera: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleCheckIn() {
    console.log(imgRef.current?.src);
  }

  function successFunc(mediaStream: MediaStream) {
    const video = videoRef.current as HTMLVideoElement;
    // 旧的浏览器可能没有srcObject
    if ('srcObject' in video) {
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
    setIsOpen(false);
    const video = videoRef.current as HTMLVideoElement;
    const stream = video.srcObject as MediaStream;
    if ('getTracks' in stream) {
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
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight); // 把视频中的一帧在canvas画布里面绘制出来
    const imgStr = canvas.toDataURL(); // 将图片资源转成字符串
    const base64Img = imgStr.split(';base64,').pop(); // 将图片资源转成base64格式
    const imgData = {
      base64Img,
    };
    closeMedia(); // 获取到图片之后可以自动关闭摄像头
    return imgData;
  }

  function saveImg() {
    const data = getImg() as { base64Img: string };
    const img = imgRef.current as HTMLImageElement;
    img.src = data.base64Img as string;
  }

  return (
    <Paper 
      elevation={1}
      sx={{
        width: '100%',
        height: 500,
        borderRadius: 2,
      }}
    >
      <Stack
        direction='column'
        position='relative'
      >
        <Box
          component='div' 
          sx={{
            width: '100%',
          }}
        >
            <video
              ref={videoRef}
              width={videoSize.width}
              height={videoSize.height}
              className={classNames(isOpen ? '' : 'hidden', 'mx-auto mt-8 rounded-lg')}
            />
            <canvas
              ref={canvasRef}
              width={videoSize.width}
              height={videoSize.height}
              className={classNames(isOpen ? 'hidden' : '', 'mx-auto mt-8 rounded-lg')}
            />
        </Box>
          <img ref={imgRef} src='' alt='imgTag' width={videoSize.width} height={videoSize.height} className='w-full hidden mx-auto mt-8 rounded-lg' />

        <Stack 
          direction='row' 
          justifyContent='space-around'
          alignItems='center'
          sx={{
            mt: 5,
            px: 12
          }}
        >
          <IButton onClick={openMedia}>
            打开摄像头
          </IButton>
          <IButton onClick={saveImg}>
            截图
          </IButton>
          <IButton onClick={handleCheckIn}>
            提交
          </IButton>
        </Stack>
      </Stack>
    </Paper> 
  );
}

export default Camera