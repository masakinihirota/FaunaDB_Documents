function alphabetPosition(text) {
    return text
    .toUpperCase()
    .match(/[a-zA-Z]/gi)
    // .map((c)=>c.charCodeAt()-65)
    .map()
    .join(' ');
}

console.log(

    alphabetPosition("Apple")
);
