import { memo } from "react";
import { filterCollectionSchema } from "../../schema/index"
import { useRouter, useState } from "../"
import { useFormik } from "formik";
import { toast } from "react-toastify";

const Filter = ({ showItems }) => {

  const router = useRouter();

  let initialValues = {
    collectionName: "",
    authorName: "",
    email: "",
    walletAddress: "",
    minimumVolume: "",
    maximumVolume: "",
    minimumFloor: "",
    maximumFloor: "",
  };


  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useFormik({
    initialValues,
    validationSchema: filterCollectionSchema,

    onSubmit: async (values, action) => {

      // const isEmpty = Object.values(values).every(x => x === '');
      // if (isEmpty) {
      //   toast.error('Please use at least one filter', {
      //     position: "top-center",
      //   })
      //   return;
      // }

      let route='?'
      
      // var route =path.substr(0, path.indexOf('?'))   + '?'
      // console.log("🚀 ~ file: filter.js ~ line 46 ~ onSubmit: ~ route substring", route)

      for (let key in values) {
        if (values[key] !== '') {

          if (route.charAt(route.length - 1) === '?') {
            route = route + key + '=' + values[key].trim().toLowerCase()
          }
          else{
            route = route+'&' + key + '=' + values[key].trim().toLowerCase()
        }
      }
    }


      console.log("🚀 ~ file: filter.js ~ line 49 ~ onSubmit: ~ route", route)
    router.push(route);
  } })

return (
  <div className={"bg-[#EDF2F7] rounded-[1.1rem] mt-[0.4rem]  overflow-hidden transition-all duration-700 " + (!showItems ? "max-h-0" : "max-h-[60rem]")}>

    <form onSubmit={handleSubmit}>
      <div className="transition-all duration-500 text-[#FD2121DB] text-center text-[1.3rem] md:text-[1.5rem] pt-[1rem] px-[1rem] font-['Inconsolata']">If you don’t want to use any filter from below simply leave it empty</div>


      <div className="flex flex-wrap md:space-x-[1.5rem] md:justify-center lg:justify-center lg:mr-[0.6rem] xl:mr-[0rem] xl:justify-center lg:space-x-[1rem] xl:space-x-[1.8rem] px-[1.5rem] md:px-[1rem] pb-[1.5rem] ">

        <div className="md:ml-[1.5rem] lg:ml-[1rem] xl:ml-[1.8rem] mt-[1.5rem] w-[100%] md:w-[35rem] lg:w-[34rem] xl:w-[34rem]">
          <div className="input_bord_grad w-[100%] md:w-[35rem] lg:w-[34rem] xl:w-[34rem] mb-[0.2rem]">
            <input type="text"
              className="outline-none text-[1.6rem] md:text-[1.7rem] border-none w-[100%] rounded-[1.2rem] p-[0.8rem] font-['Inconsolata']"
              placeholder="Enter Collection Name"
              name="collectionName"
              value={values.collectionName}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
            />
          </div>
          {errors.collectionName && touched.collectionName ? (
            <p className="text-red-500 text-[1.4rem] errors block">
              {errors.collectionName}
            </p>
          ) : null}
        </div>



        <div className="md:ml-[1.5rem] lg:ml-[1rem] xl:ml-[1.8rem] mt-[1.5rem] w-[100%] md:w-[35rem] lg:w-[34rem] xl:w-[34rem]">
          <div className="input_bord_grad w-[100%] md:w-[35rem] lg:w-[34rem] xl:w-[34rem] mb-[0.2rem]">
            <input type="text"
              className="outline-none text-[1.6rem] md:text-[1.7rem] border-none w-[100%] rounded-[1.2rem] p-[0.8rem] font-['Inconsolata']"
              placeholder="Enter author email address"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
            />
          </div>
          {errors.email && touched.email ? (
            <p className="text-red-500 text-[1.4rem] errors block">
              {errors.email}
            </p>
          ) : null}
        </div>


        <div className="md:ml-[1.5rem] lg:ml-[1rem] xl:ml-[1.8rem] mt-[1.5rem] w-[100%] md:w-[35rem] lg:w-[34rem] xl:w-[34rem]">
          <div className="input_bord_grad w-[100%] md:w-[35rem] lg:w-[34rem] xl:w-[34rem] mb-[0.2rem]">
            <input type="text"
              className="outline-none text-[1.6rem] md:text-[1.7rem] border-none w-[100%] rounded-[1.2rem] p-[0.8rem] font-['Inconsolata']"
              placeholder="Enter collection author name"
              name="authorName"
              value={values.authorName}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
            />
          </div>
          {errors.authorName && touched.authorName ? (
            <p className="text-red-500 text-[1.4rem] errors block">
              {errors.authorName}
            </p>
          ) : null}
        </div>




        <div className="md:ml-[1.5rem] lg:ml-[1rem] xl:ml-[1.8rem] mt-[1.5rem] w-[100%] md:w-[35rem] lg:w-[34rem] xl:w-[34rem]">
          <div className="input_bord_grad w-[100%] md:w-[35rem] lg:w-[34rem] xl:w-[34rem] mb-[0.2rem]">
            <input type="text"
              className="outline-none text-[1.6rem] md:text-[1.7rem] border-none w-[100%] rounded-[1.2rem] p-[0.8rem] font-['Inconsolata']"
              placeholder="Enter collection author name"
              name="walletAddress"
              value={values.walletAddress}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
            />
          </div>
          {errors.walletAddress && touched.walletAddress ? (
            <p className="text-red-500 text-[1.4rem] errors block">
              {errors.walletAddress}
            </p>
          ) : null}
        </div>


        <div className="md:ml-[1.5rem] lg:ml-[1rem] xl:ml-[1.8rem] mt-[1.5rem] w-[100%] md:w-[35rem] lg:w-[34rem] xl:w-[34rem]">
          <div className="input_bord_grad w-[100%] md:w-[35rem] lg:w-[34rem] xl:w-[34rem] mb-[0.2rem]">
            <input type="text"
              className="outline-none text-[1.6rem] md:text-[1.7rem] border-none w-[100%] rounded-[1.2rem] p-[0.8rem] font-['Inconsolata']"
              placeholder="Enter minimum volume price in USD"
              name="minimumVolume"
              value={values.minimumVolume}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
            />
          </div>
          {errors.minimumVolume && touched.minimumVolume ? (
            <p className="text-red-500 text-[1.4rem] errors block">
              {errors.minimumVolume}
            </p>
          ) : null}
        </div>



        <div className="md:ml-[1.5rem] lg:ml-[1rem] xl:ml-[1.8rem] mt-[1.5rem] w-[100%] md:w-[35rem] lg:w-[34rem] xl:w-[34rem]">
          <div className="input_bord_grad w-[100%] md:w-[35rem] lg:w-[34rem] xl:w-[34rem] mb-[0.2rem]">
            <input type="text"
              className="outline-none text-[1.6rem] md:text-[1.7rem] border-none w-[100%] rounded-[1.2rem] p-[0.8rem] font-['Inconsolata']"
              placeholder="Enter maximum volume price in USD"
              name="maximumVolume"
              value={values.maximumVolume}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
            />
          </div>
          {errors.maximumVolume && touched.maximumVolume ? (
            <p className="text-red-500 text-[1.4rem] errors block">
              {errors.maximumVolume}
            </p>
          ) : null}
        </div>


        <div className="md:ml-[1.5rem] lg:ml-[1rem] xl:ml-[1.8rem] mt-[1.5rem] w-[100%] md:w-[35rem] lg:w-[34rem] xl:w-[34rem]">
          <div className="input_bord_grad w-[100%] md:w-[35rem] lg:w-[34rem] xl:w-[34rem] mb-[0.2rem]">
            <input type="text"
              className="outline-none text-[1.6rem] md:text-[1.7rem] border-none w-[100%] rounded-[1.2rem] p-[0.8rem] font-['Inconsolata']"
              placeholder="Enter minimum floor price in USD"
              name="minimumFloor"
              value={values.minimumFloor}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
            />
          </div>
          {errors.minimumFloor && touched.minimumFloor ? (
            <p className="text-red-500 text-[1.4rem] errors block">
              {errors.minimumFloor}
            </p>
          ) : null}
        </div>


        <div className="md:ml-[1.5rem] lg:ml-[1rem] xl:ml-[1.8rem] mt-[1.5rem] w-[100%] md:w-[35rem] lg:w-[34rem] xl:w-[34rem]">
          <div className="input_bord_grad w-[100%] md:w-[35rem] lg:w-[34rem] xl:w-[34rem] mb-[0.2rem]">
            <input type="text"
              className="outline-none text-[1.6rem] md:text-[1.7rem] border-none w-[100%] rounded-[1.2rem] p-[0.8rem] font-['Inconsolata']"
              placeholder="Enter maximum floor price in USD"
              name="maximumFloor"
              value={values.maximumFloor}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
            />
          </div>
          {errors.maximumFloor && touched.maximumFloor ? (
            <p className="text-red-500 text-[1.4rem] errors block">
              {errors.maximumFloor}
            </p>
          ) : null}
        </div>

        {/* <div className="input_bord_grad w-[100%] md:w-[35rem] lg:w-[34rem] xl:w-[34rem] mt-[1.5rem]">
            <input type="text" className="outline-none text-[1.6rem] md:text-[1.7rem] border-none w-[100%] rounded-[1.2rem] p-[0.8rem] font-['Inconsolata']" placeholder="Enter author wallet address"/>
         </div> */}

        {/* <div className="input_bord_grad w-[100%] md:w-[35rem] lg:w-[34rem] xl:w-[34rem] mt-[1.5rem]">
            <input type="number" min="0" className="outline-none text-[1.6rem] md:text-[1.7rem] border-none w-[100%] rounded-[1.2rem] p-[0.8rem] font-['Inconsolata']" />
         </div> */}
        {/* 
         <div className="input_bord_grad w-[100%] md:w-[35rem] lg:w-[34rem] xl:w-[34rem] mt-[1.5rem]">
            <input type="number" min="0" className="outline-none text-[1.6rem] md:text-[1.7rem] border-none w-[100%] rounded-[1.2rem] p-[0.8rem] font-['Inconsolata']" placeholder="Enter maximum volume price in USD"/>
         </div>
         <div className="input_bord_grad w-[100%] md:w-[35rem] lg:w-[34rem] xl:w-[34rem] mt-[1.5rem]">
            <input type="number" min="0" className="outline-none text-[1.6rem] md:text-[1.7rem] border-none w-[100%] rounded-[1.2rem] p-[0.8rem] font-['Inconsolata']" placeholder="Enter minimum volume price in USD"/>
         </div> */}
        {/* <div className="input_bord_grad w-[100%] md:w-[35rem] lg:w-[34rem] xl:w-[34rem] mt-[1.5rem]">
            <input type="number" min="0" className="outline-none text-[1.6rem] md:text-[1.7rem] border-none w-[100%] rounded-[1.2rem] p-[0.8rem] font-['Inconsolata']" placeholder="Enter maximum volume price in USD"/>
         </div> */}
      </div>

      <div className="flex justify-center mb-[1.2rem]">
        <button type="submit" className="bg-blue-500  hover:bg-blue-700  text-white font-normal text-[18px] font-['Inconsolata'] sm:font-semibold  px-12  py-[0.7rem] sm:px-14 rounded-full">
          Search
        </button>
      </div>
    </form>
  </div>)
}

export default memo(Filter);