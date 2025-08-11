"use client";

import { Apiresponse } from "@/lib/utils";
import { useEffect, useState } from "react";

const BASE_URL = "https://api.mcsrvstat.us/3/";
const OPTIONS = {
  method: 'GET', 
  headers: {
    accept: 'application/json'
  }
};

const sample_address = "hypixel.net"

export default function Search(){
    // const [address, setAddress] = useState("");
    const [data, setData] = useState<Apiresponse>();

    const fetchData = async () => {
        try{
            const response = await fetch(BASE_URL+sample_address, OPTIONS);
            const data:Apiresponse = await response.json();
            setData(data);
            console.log(data);
        }
        catch (e){
            console.log(e);
        }
    }

    useEffect(() => {
        fetchData();
    },[]);

    return(
        <p>{data?.ip}</p>
    )
}


