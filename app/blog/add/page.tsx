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

    // ref's for h
  return (
    <>
        
    </>
  )
}

export default AddBlog