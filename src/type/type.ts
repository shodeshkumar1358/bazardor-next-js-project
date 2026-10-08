export interface LinkType{
    id:string
    slug:string
    nameBn:string
    icon:string
}
 
export interface Products {
  id: number;
  nameBn: string;
  unit: string;
  image: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}
