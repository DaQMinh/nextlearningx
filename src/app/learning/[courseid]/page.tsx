import { getVideo } from "./getVideo";
import Sidebar from "../sidebar";
import Video from "../videoplayer";

export default async function Page({
  params,
}: {
  params: { courseid: string };
}) {
  const data = await getVideo(params.courseid)
    
  return (
        <Sidebar data={data}>
          <Video/>
        </Sidebar>
    );
}
