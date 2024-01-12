import { getVideo } from "./getVideo";
import Sidebar from "../sidebar";
import Video from "../videoplayer";
export interface TypesList {
  ids: string[];
  titles: string[];
}

export default async function Page({
  params,
}: {
  params: { courseid: string };
}) {
  const data = await getVideo(params.courseid)
  const playlist = data.map((item) => (item.playlist as TypesList))
    
  return (
        <Sidebar data={playlist}>
          <Video/>
        </Sidebar>
    );
}
