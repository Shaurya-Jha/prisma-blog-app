"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

// type declaration for the type safety
type UpdateBlogParams = {
  title: string;
  description: string;
  id: string;
};

// update blog function
const updateBlog = async (data: UpdateBlogParams) => {
  const response = fetch(`http://localhost:3000/api/blog/${data.id}`, {
    method: "PUT",
    body: JSON.stringify({
      title: data.title,
      description: data.description,
    }),
    // @ts-ignore
    "Content-Type": "application/json",
  });

  return (await response).json();
};

// delete blog function
const deleteBlog = async (id: string) => {
  const response = fetch(`http://localhost:3000/api/blog/${id}`, {
    method: "DELETE",
    // @ts-ignore
    "Content-Type": "application/json",
  });

  return (await response).json();
};

// get blog by the id
const getBlogById = async (id: string) => {
  const response = await fetch(`http://localhost:3000/api/blog/${id}`);

  // this will store all the data in the data variable
  const data = await response.json();
  return data.post;
};

const EditBlog = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  // useEffect to fetch the data while the page loads
  useEffect(() => {
    toast.loading("Fetching Blog details 🔍", { id: "1" });

    getBlogById(params.id)
      .then((data) => {
        if (titleRef.current && descriptionRef.current) {
          titleRef.current.value = data.title;
          descriptionRef.current.value = data.description;

          toast.success("Fetching complete ✅", { id: "1" });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error fetching blog ❌", { id: "1" });
      });
  }, []);

  // form submit handle function
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (titleRef.current && descriptionRef.current) {
      toast.loading("Sending request 🚀", { id: "1" });

      await updateBlog({
        title: titleRef.current?.value,
        description: descriptionRef.current?.value,
        id: params.id,
      });

      toast.success("Blog posted successfully 🎉", { id: "1" });

      await router.push("/");
    }
  };

  // handle delete function for deleting the blog selected by id
  const handleDelete = async () => {
    toast.loading("Deleting blog", { id: "2" });
    await deleteBlog(params.id);

    toast.success("Blog deleted 🎉", { id: "2" });
    router.push("/");
  };

  return (
    <>
      <Toaster />
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold p-3">
            Edit A Wonderful Blog 🎉
          </p>

          <form onSubmit={handleSubmit}>
            <input
              ref={titleRef}
              placeholder="Enter Title"
              type="text"
              className="rounded-md px-4 w-full py-2 my-2 "
            />
            <textarea
              ref={descriptionRef}
              placeholder="Enter Description"
              className="rounded-md px-4 py-2 w-full my-2"
            ></textarea>
            <div className="flex justify-between">
              <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
                Update
              </button>
            </div>
          </form>
          <button
            onClick={handleDelete}
            className="font-semibold px-4 py-2 shadow-xl bg-red-400 rounded-lg  m-auto mt-2 hover:bg-red-500"
          >
            Delete
          </button>
          {/* </form> */}
        </div>
      </div>
    </>
  );
};

export default EditBlog;
