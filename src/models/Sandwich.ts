export default class Sandwich {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    userId: string;
    layers: Array<string>;
    
    constructor(id: number, name: string, description: string, imageUrl: string, userId: string, layers: Array<string>) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.userId = userId;
        this.layers = layers;
    }
}