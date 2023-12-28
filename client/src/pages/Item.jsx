import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../utils/http";
import { useParams } from "react-router-dom";

function Item() {
    const params = useParams();

    const itemById = useQuery({
      queryKey: ["itemId"],
      queryFn: () => fetchData(params.itemId),
    });
    
  return (
      <section>
          <div>
              
          </div>
          <div>recommended</div>
    </section>
  )
}

export default Item