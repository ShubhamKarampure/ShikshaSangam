import React from "react";
import JobPage from "./components/JobPage";
import PageMetaData from "@/components/PageMetaData";

function page() {
  return (
    <>
      <PageMetaData title="Events 2" />
      <main>
        <JobPage />
      </main>
    </>
  );
}

export default page;
