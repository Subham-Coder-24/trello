"use client";
import { useOrganizationList } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const OrganizationControl = () => {
  const params = useParams();
  const { setActive } = useOrganizationList();

  useEffect(() => {
    if (!setActive) return;
    console.log("enterd");
    
    setActive({
      organization: params.organizationid as string,
    });

  }, [setActive, params.organizationid]);

  return null;
};

export default OrganizationControl;