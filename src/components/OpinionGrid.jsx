import OpinionComponent from "./OpinionComponent";
import { v4 } from "uuid";

function OpinionGrid(props)
{
    return(
        <>
            <div className="container-fluid">
                <div className="row row-cols-1 row-cols-md-4  row-cols-xl-6 row-cols-xxl-8 gy-3">
                    {props.opinions.map((o)=>
                        <OpinionComponent {...o} key={v4()} />
                    )}
                </div>
            </div>
            
        </>
    );
}

export default OpinionGrid;