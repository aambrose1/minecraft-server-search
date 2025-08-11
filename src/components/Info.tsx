import { Apiresponse } from "@/lib/utils";
import Image from 'next/image';

type AppProps = {
  mydata: Apiresponse
};

const Info = ({mydata}:AppProps) =>
    <div>
        <Image 
            src={mydata.icon}
            alt="Server icon"
            width={100}
            height={100}
        />
        <h1>{mydata.hostname}</h1>
        <h2>{mydata.motd.clean}</h2>
        <span><strong>Player Count:</strong>{mydata.players.online} / {mydata.players.max}</span>

    </div>
;

export default Info;