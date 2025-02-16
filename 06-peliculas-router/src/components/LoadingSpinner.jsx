import { GridLoader } from "react-spinners";
const LoadingSpinner = () => {
  return (
    <div className='flex justify-center items-center'>
      <div className='relative'>
        <GridLoader color="#327fa9" />
      </div>
    </div>
  )
}

export default LoadingSpinner;