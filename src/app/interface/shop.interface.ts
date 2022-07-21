export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageConverted: string;
    taxonomy?: Taxonomy;
}

export interface Taxonomy {
    id: number;
    name: string;
    subCategory: SubCategory;
}

export interface SubCategory {
    id: number;
    name: SubCategoryName;
    category: Category;
}

export interface Category {
    id: number;
    name: CategoryName;
}

export enum CategoryName {
    Electrohogar = "Electrohogar",
    Muebles = "Muebles",
}

export enum SubCategoryName {
    Computo = "computo",
    Sala = "sala",
    Telefonia = "telefonia",
    Televisores = "televisores",
    Videojuegos = "videojuegos",
}
