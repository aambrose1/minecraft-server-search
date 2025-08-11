import { Apiresponse } from "@/lib/utils";
import { Space } from "lucide-react";
import Image from 'next/image';

type AppProps = {
  mydata: Apiresponse
};

const Info = ({mydata}:AppProps) =>
    <div className="card-foreground">
        {mydata.online == true ?
            <Image 
                src={mydata.icon}
                alt="Server icon"
                width={100}
                height={100}
            />
            :
            null
        }
        <h1 className="font-bold text-lg accent">{mydata.hostname}</h1>
        <div>
            {mydata.online == true ? 
                <><span>
                    🟢<strong>Player Count: </strong>
                    {mydata.players.online} / {mydata.players.max}
                </span><br /><h2>Version: {mydata.version}</h2><i className="text-sm">{mydata.motd.clean}</i></>
                :
                <span>🔴Offline</span>
            }
        </div>
    </div>
;

export default Info;