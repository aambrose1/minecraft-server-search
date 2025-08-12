import { ApiResponse as ApiResponse } from "@/lib/types";
import Image from 'next/image';

type AppProps = {
  mydata: ApiResponse
};

function htmlDecode(html: string): string | TrustedHTML {
    return html;
}

const Info = ({mydata}:AppProps) =>
    <div className="">
        <>
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
                </span><br /><h2>Version: {mydata.version}</h2>      
                <div dangerouslySetInnerHTML={{ __html: htmlDecode(mydata.motd.html) }} />
        </>
                :
                <span>🔴Offline</span> // Bug: Queries that aren't real MC servers also say offline because there wasn't a reliable way to filter
            }
        </div>
        </>
    </div>
;

export default Info;