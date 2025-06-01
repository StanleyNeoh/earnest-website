import dynamic from "next/dynamic";

const Mapbox = dynamic(() => import("./mapbox-client"), { ssr: false });

export default Mapbox;

