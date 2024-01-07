export default function Page(
    { params }:{ params : { courseid: string }}) 
{
    return <div>Course : {params.courseid}</div>
}