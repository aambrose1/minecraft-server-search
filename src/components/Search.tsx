"use client";

import { ApiResponse } from "@/lib/types";
import { ChangeEvent, useState } from "react";
import Info from "./Info";
import { Input } from "@/components/ui/input"
import { Button } from "./ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const BASE_URL = "https://api.mcsrvstat.us/3/";
const OPTIONS:RequestInit = {
    mode: 'cors',
    method: 'GET',
    headers: {
    accept: 'application/json',
    'User-Agent': 'MINECRAFT SERVER SEARCH'
  }
};

function checkIp(ip:string) {
    const ipv4:RegExp = 
        /^(\d{1,3}\.){3}\d{1,3}$/;
    const ipv6:RegExp = 
        /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
    return ipv4.test(ip) || ipv6.test(ip);
}

function checkDomain(domain: string){
    const name:RegExp = /^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,6}(:\d{1,5})?$/;;
    return name.test(domain);
}

export default function Search(){
    const [query, setQuery] = useState<string>(""); 
    const [data, setData] = useState<ApiResponse>();
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("Unknown error has occured.");
    
    const fetchData = async (input: string) => {
        setLoading(true);
        const address:string = input; 
        try{
            const response = await fetch(BASE_URL+address, OPTIONS);

            if (!response.ok) {
                setErrorMsg("HTTP error! Status: " + response.status);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data:ApiResponse = await response.json();
            setData(data);
        }
        catch (e){
            console.log("Error fetching server information: "+ e);
            setErrorMsg("Error fetching server information: "+ e)
            setError(true);
        }
        finally{
            setLoading(false);
        }
    }

    const handleSubmit = () => {
        const input = query.trim();        
        const isValid = checkDomain(input) || checkIp(input);
        const isNumeric  = /^[0-9]*$/.test(input.replace(".","").replace(":",""));

        if (isNumeric) { setErrorMsg("Please enter a valid IP Address (port optional).");} else { setErrorMsg("Please enter a valid domain.");}

        setError(!isValid); // set the error when there isn't a valid ip/domain or when there is a valid ip/domain
        console.log(isValid);
        // good to go, so we can fetch
        if (isValid) {
            fetchData(input);
        }
    }

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        await setQuery(e.target.value);
    }

    return(
        <div className="">
            <span className="m-5">
                <Input
                    className="bg-white"
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder="123.123.123.123:8888 OR example.net"
                />
                <Button 
                    onClick={handleSubmit}
                    disabled={loading || query.trim().length === 0}
                >
                    Search
                </Button>
            </span>
            <div className="">
                {error ? 
                    <Alert variant="destructive">
                    <AlertTitle>Error!</AlertTitle>
                    <AlertDescription>
                        {errorMsg}
                    </AlertDescription>
                    </Alert>
                :
                    <div className="m-5">
                        {loading ?
                            <p>Loading...</p> 
                            : 
                            data ?
                                <Info mydata={data}/> 
                                : <p>Get server data using the search bar.</p>
                        }
                    </div>
                }
            </div>
        </div>
    )
}


