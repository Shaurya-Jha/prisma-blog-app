"use client"

import { useRouter } from "next/navigation";
import { useRef } from "react";
import { Toaster, toast } from "react-hot-toast";

const postBlog = async({title, description}:{title: string, description: string}) => {
    const res = fetch("http://localhost:3000/api/blog", {
        method: "POST",
        body: JSON.stringify({title, description}),
        // @ts-ignore
        "Content-Type":"application/json",
    });

    return (await res).json();
}

const AddBlog = () => {

    // router initialization 
    const router = useRouter();

    // ref's for handling input from the form
    const titleRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

    // handleSubmit function to handle the form submit action on submitting the form
    const handleSubmit = async (e : any) => {
      e.preventDefault();

      if(titleRef.current && descriptionRef.current){
        toast.loading("sending Request 🚀", {id: "1"});

        // sending data to the backend - to mongodb database
        await postBlog({
          title: titleRef.current?.value,
          description: descriptionRef.current?.value
        });

        toast.success("Blog successfully posted",{id:"1"});
        router.push("/");
      }
    }
  return (
    <>
      <Toaster />

      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-white font-bold p-3">
            Add a wonderful blog 🎉
          </p>

          <form onSubmit={handleSubmit}>
            {/* title input */}
            <input ref={titleRef} placeholder="Enter title..." type="text" className="rounded-md px-4 py-2 w-full my-2 text-black" />

            {/* description / content input area */}
            <textarea ref={descriptionRef} placeholder="Enter description..." className="rounded-md px-4 py-2 w-full my-2 text-black" />

            <button className="font-semibold px-4 py-2 shadow-xl bg-white text-black rounded-lg m-auto hover:bg-slate-100">Submit</button>
          </form>
        </div>
      </div>  
    </>
  )
}

export default AddBlog