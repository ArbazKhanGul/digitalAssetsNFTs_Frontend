import Image from "next/image";
import Navbar from "../components/navbar";
import { useState, useEffect, useRef } from "react";
import Footer from "../components/footer/footer";
import { UpdateSchema } from "../schema";
import { selectAddress, addAddress } from "../slice/metamask";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { selectUser, addUser } from "../slice/user";
import { useFormik } from "formik";
import load from "../utils/validate";
import axios from "../utils/axiosconfiguration";
const profileUpdate = () => {
  // const [showItems, show] = useState(false);

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const address = useSelector(selectAddress);
  const user = useSelector(selectUser);
  const [checker, setChecker] = useState(false);
  const profileRef = useRef(null);
  const coverRef = useRef(null);

  const [profileInfo, setProfileInfo] = useState("");
  const [coverInfo, setcoverInfo] = useState("");


  let initialValues = {
    collectionName: "",
    authorName: "",
    description: "",
    profile: "",
    cover: "",
  };

  //validate token
  useEffect(() => {
    load(address, dispatch, router, setLoading);
  }, [address]);

  useEffect(() => {
    if (user) {
      console.log("Running update user useEffect")
      setFieldValue("collectionName", user?.collectionName);
      setFieldValue("authorName", user?.authorName);
      setFieldValue("description", user?.description);
      setFieldValue("profile", "");
      setFieldValue("cover", "");
      setProfileInfo(process.env.SERVER + "/" + user?.profile);
      setcoverInfo(process.env.SERVER + "/" + user?.cover);
    }
  }, [user]);

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema: UpdateSchema,

    onSubmit: async (values, action) => {
      console.log(
        "🚀 ~ file: profileUpdate.js ~ line 34 ~ onSubmit: ~ values",values);
      setChecker(true);
        let updateObject={};

        if(user?.collectionName!=values.collectionName.trim())
        {
          updateObject.collectionName=values.collectionName;
        }

        if(user?.authorName!=values.authorName.trim())
        {
          updateObject.authorName=values.authorName;
        }

        if(user?.description!=values.description.trim())
        {
          updateObject.description=values.description;
        }

        if(values?.profile)
        {
          updateObject.profile=values.profile
        }

        if(values?.cover)
        {
          updateObject.cover=values.cover
        }

        console.log("🚀 ~ file: profileUpdate.js ~ line 72 ~ onSubmit: ~ updateObject", updateObject)

        if(Object.keys(updateObject).length === 0){
          return;
        }
      const formdata = new FormData();
      for (var key in updateObject) {
        formdata.append(key, values[key]);
      }
      try {
        const access_token = localStorage.getItem("token");
        const response = await axios.patch("/profileUpdate", formdata, {
          headers: {
            Authorization: `${access_token}`,
          },
        });

        if (response?.data?.message == "success") {
          
          if(response?.data?.user)
          dispatch(addUser(response?.data?.user));


        console.log("🚀 ~ file: profileUpdate.js ~ line 116 ~ onSubmit: ~ response?.data?", response?.data?.user);
          
        toast.success("Successfully update", {
            position: "top-center",
          });
        
        }
      } catch (error) {
        console.log(
          "🚀 ~ file: registration.js ~ line 85 ~ onSubmit: ~ error",
          error
        );
        if (error?.response?.data == undefined) {
          toast.error("Server Error Please Try Later Or Check your internet", {
            position: "top-center",
          });
        } else {

          toast.error(error?.response?.data.message, {
            position: "top-center",
          });
        }
      }
      setChecker(false);
    },
  });
  // console.log(
  //   "🚀 ~ file: profileUpdate.js ~ line 109 ~ profileUpdate ~ errors",
  //   errors
  // );

  const preview = (file, type) => {
    console.log("Calling preview");
    if (file == "") {
      console.log("empty file");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (type == "profile") setProfileInfo(reader.result);
      else setcoverInfo(reader.result);
    };
  };

  return (
    <>
      {!loading ? (
        <div className="text-[1.6rem] font-['Inconsolata']">
          <ToastContainer pauseOnHover autoClose={5000} />
        </div>
      ) : (
        <>
          <Navbar></Navbar>
          <div>
            <div>
              <div className=" w-[100%] h-[26rem]  relative">
                <Image
                  src={coverInfo}
                  alt={"Error in loadng file"}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>

            <div className="ml-[5rem] -mt-[4.7rem] md:-mt-[5.7rem]  z-50 absolute right-[1rem]  inline-block ">
              <div
                className="w-[4rem] h-[4rem] md:w-[5rem] md:h-[5rem]  relative cursor-pointer"
                onClick={() => {
                  coverRef.current.click();
                }}
              >
                <Image
                  src={`/updation.png`}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-xl"
                />
              </div>
            </div>

            <div className="flex justify-center md:block">
              <div className="  md:ml-[5rem] -mt-[7.5rem]  border-white z-50 relative border-[0.4rem] inline-block rounded-xl">
                <div className="w-[15rem] h-[15rem]  relative">
                  <Image
                    src={profileInfo}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center md:block md:ml-[5rem] mt-[0.3rem]">
            <div
              className="bord_grad w-fit text-[1.85rem] !rounded-2xl cursor-pointer"
              onClick={() => {
                profileRef.current.click();
              }}
            >
              <span className="block px-[1.7rem] font-medium py-[0.4rem] buttonnft  !rounded-xl">
                Change Photo
              </span>
            </div>
          </div>

          <div className="ml-[2.5rem] md:ml-[5rem] mr-[2.5rem]">
            <form onSubmit={handleSubmit}>
              <div className="mt-[1.5rem]">
                <h2 className="font-['Inconsolata'] text-[2.4rem] font-medium">
                  Collection Name
                </h2>
                <div className="input_bord_grad w-[100%] md:w-[50rem]  mt-[0.8rem] ">
                  <input
                    type="text"
                    className="outline-none text-[1.6rem] md:text-[1.7rem] border-none w-[100%] rounded-[1.2rem] p-[0.8rem] font-['Inconsolata']"
                    placeholder="Collection Name..."
                    name="collectionName"
                    value={values?.collectionName}
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

              <div className="mt-[1.5rem]">
                <h2 className="font-['Inconsolata'] text-[2.4rem] font-medium">
                  Author Name
                </h2>
                <div className="input_bord_grad w-[100%] md:w-[50rem] mt-[0.8rem]">
                  <input
                    type="text"
                    className="outline-none text-[1.6rem] md:text-[1.7rem] border-none w-[100%] rounded-[1.2rem] p-[0.8rem] font-['Inconsolata']"
                    placeholder="Author Name..."
                    name="authorName"
                    value={values?.authorName}
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

              <div className="mt-[1.5rem]   ">
                <h2 className="font-['Inconsolata'] text-[2.4rem] font-medium">
                  Description
                </h2>
                <div className="w-[100%] md:w-[50rem] input_bord_grad flex justify-center  space-y-[0.5rem] mt-[0.8rem]">
                  <textarea
                    name="description"
                    value={values?.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="off"
                    placeholder="Description..."
                    className="rounded-2xl resize-none outline-none h-[13rem]  w-[100%]  block placeholder:text-[#746e6e] p-[0.8rem] text-black text-[1.7rem] sm:text-[1.8rem] bg-transparent font-['Inconsolata']"
                  ></textarea>
                </div>
                {errors.description && touched.description ? (
                  <p className="text-red-500 text-[1.4rem] errors block">
                    {errors.description}
                  </p>
                ) : null}
              </div>

              {/* profile Pic */}
              <input
                type="file"
                id="profile"
                name="profile"
                ref={profileRef}
                accept="image/*"
                onChange={(e) => {
                  preview(
                    e.target?.files[0] ? e.target?.files[0] : "",
                    "profile"
                  );
                  setFieldValue(
                    "profile",
                    e.target?.files[0] ? e.target?.files[0] : ""
                  );
                }}
                hidden
              />

              {/* Cover Pic */}
              <input
                type="file"
                id="cover"
                name="cover"
                ref={coverRef}
                accept="image/*"
                onChange={(e) => {
                  preview(
                    e.target?.files[0] ? e.target?.files[0] : "",
                    "cover"
                  );
                  setFieldValue(
                    "cover",
                    e.target?.files[0] ? e.target?.files[0] : ""
                  );
                }}
                hidden
              />

              <button className="bg-blue-500  hover:bg-blue-700  text-white font-normal text-[1.8rem] sm:font-semibold py-2 px-12  mt-[1.2rem] mb-[4rem] sm:py-2 sm:px-14 rounded-xl font-['Inconsolata'] tracking-wider">
                Update
              </button>
            </form>
          </div>

          <Footer></Footer>
        </>
      )}
    </>
  );
};

export default profileUpdate;
