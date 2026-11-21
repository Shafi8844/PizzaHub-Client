import { getMenuItems } from "@/lib/actions/menu"

const BrowseMenu = async({searchParams}:{searchParams: Promise<{ [key: string]: string | string[] }>}) => {
    
    const search = await searchParams;
    const urlSearchParams = new URLSearchParams(search as Record<string, string>);
    const query =urlSearchParams.toString();
    const menuItems = await getMenuItems(query);

    console.log("search params:", search);


  return (
    <div>BrowseMenu</div>
  )
}

export default BrowseMenu