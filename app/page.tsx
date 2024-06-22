"use client";
import React, { useState, useEffect } from "react";
import { addData } from "@/api/addTask";
import { ring } from "ldrs";
import { useToast } from "@/components/ui/use-toast";
import { bouncy } from "ldrs";

// Default values shown

const Page = () => {
  if (window !== undefined) {
    bouncy.register();
    ring.register();
  }
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const [submissionState, setSubmissionState] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addData(formData);
      setSubmissionState("success");
      setErrorMessage(null);
    } catch (error: any) {
      setErrorMessage(error.message);
      console.log("jajaja", error);
      setSubmissionState("error");
    }
    setLoading(false);
    setFormData({
      name: "",
    });
  };

  useEffect(() => {
    if (submissionState === "success") {
      toast({ title: "", description: "Data added successfully" });
      setSubmissionState("idle"); // Reset state to idle
    } else if (submissionState === "error" && errorMessage) {
      toast({ title: "We encountered an error", description: errorMessage });
      setSubmissionState("idle"); // Reset state to idle
    }
  }, [submissionState, errorMessage]);

  return (
    <div className="h-screen w-full bg-slate-200 flex justify-center items-center">
      <div className="bg-white w-1/2 pt-9 pb-20 rounded">
        <p className="text-center pb-3 font-semibold text-lg font-montserrat">
          Task Manager
        </p>
        <form
          action=""
          method="post"
          className="flex w-full px-8"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g wash dishes"
            className="font-montserrat px-2 border-2 rounded-s   py-2 outline-none w-3/4 border-r-0"
          />
          {loading ? (
            <button className="font-montserrat w-1/4 bg-purple-500 text-white rounded-e cursor-pointer">
              <l-bouncy size="35" speed="1.75" color="black"></l-bouncy>
            </button>
          ) : (
            <input
              type="submit"
              value="submit"
              className="font-montserrat w-1/4 bg-purple-500 text-white rounded-e cursor-pointer"
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default Page;
