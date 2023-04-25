const Page = ({title, children} : {title: string, children: React.ReactNode}) => {
  return (
    <div className="mx-auto w-4/5 mt-20 flex flex-col gap-10"> 
      <div className="text-4xl font-bold">{title}</div>
      {children}
    </div> 
  )
}

export default Page