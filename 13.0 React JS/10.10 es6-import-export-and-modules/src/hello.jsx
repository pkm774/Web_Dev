const hello = "Hello";
const world = "World";

function helloworld(){
    return hello + ' ' + world;
}

function worldhello(){
    return world + ' ' + hello;
}

export default hello;
export {world, helloworld, worldhello}