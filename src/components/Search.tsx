"use client";

import { Apiresponse } from "@/lib/utils";
import { ChangeEvent, useEffect, useState } from "react";
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
    const [address, setAddress] = useState<string>("");
    const [query, setQuery] = useState<string>("");
    const [data, setData] = useState<Apiresponse>();
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    
    const fetchData = async () => {
        setLoading(true);
        console.log(BASE_URL+address);

        try{
            const response = await fetch(BASE_URL+address, OPTIONS);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data:Apiresponse = await response.json();
            setData(data);
        }
        catch (e){
            console.log("Error fetching server information: "+ e);
            setError(true);
        }
        finally{
            setLoading(false);
        }
    }

    const handleSubmit = () => {
        const input = query.trim();
        const isValid = checkDomain(input) || checkIp(input);
        setError(!isValid); // set the error when there isn't a valid ip/domain or when there is a valid ip/domain
        console.log(isValid);
        // good to go, so we can fetch
        if (isValid) {
            setAddress(input);
        }
    }

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        await setQuery(e.target.value);
    }

    useEffect(() => {
    if (address) {
        fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address]);

    return( // Loading needs to be suspense or something
        <div>
            <span className="m-5">
                <Input
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
            <div className="grid w-full max-w-xl items-start gap-4">
                {error ? 
                    <Alert variant="destructive">
                    <AlertTitle>Error!</AlertTitle>
                    <AlertDescription>
                        Please double-check the domain address.
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


