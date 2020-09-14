/**
 * @description fancylog is a function that takes in a string and an object and logs it to the console
 * with the styling provided for the different tags.
 * @param {String} message - The message you want to log
 * @param {Object} styleObject - Object with styles for the different id's (CSS IN JS)
 */
function fancylog(message, styleObject) {
    // Regex shit
    const tagsRegex = /<\s*(#.*?|b|i)(?:=['"](.*?)['"])?>(.*?)<(.*?)\/(?:|b|i)\s*>|<\s*img(.*?)src="(.*?)"(.*?)(#.*?)\s*\/>/ig;
    const singleTagRegex = /<(.*?)>(.*)<\/>/i;
    const isImageTagRegex = /<\s*img(.*?)>/;
    const imageInfoRegex = /<img(.*?)src="(.*?)"(.*?)\s*\/>/i;
    const unwantedTokensRegex = /%[sdifoO]/g;

    // Init styling for normal console text
    const resetStyle = 'text-decoration: none; color: black; background: none;';

    let input = message.replace(unwantedTokensRegex, '');
    const listOfStyles = [];
    const tagsFound = input.match(tagsRegex);

    if (!tagsFound) return console.log(message);

    tagsFound.forEach(tag => {
        const isImageTag = tag.match(isImageTagRegex);

        if (!isImageTag) {
            const tagInfo = tag.match(singleTagRegex);
            input = input.replace(tag, `%c${tagInfo[2]}%c`);
            listOfStyles.push(tagInfo[1].replace('#', '').trim())
            listOfStyles.push('resetStyle')
        } else {
            const imageTagInfo = tag.match(imageInfoRegex)
            let imageSrc = '';
            let id = '';

            imageTagInfo.forEach(groupPart => {
                if (groupPart.trim().startsWith('#')) listOfStyles.push(id = groupPart.replace('#', '').trim());
                else imageSrc = groupPart;
            });

            listOfStyles.push('resetStyle');
            input = input.replace(tag, '%c %c');

            const currentImageStyles = styleObject[id];
            const allowedStyles = { width: true, height: true };

            Object.entries(currentImageStyles).forEach(([key, value]) => {
                if (!allowedStyles[key]) throw Error(`Styling attribute ${key} not allowed for images. (found in: ${id})`);
                else if (isNaN(parseInt(value))) throw Error(`The value "${value}" for attribute ${key} is not supported. (found in: ${id})`);
            });

            const currentImageHeight = currentImageStyles.height ? currentImageStyles.height : '10px';
            const currentImageWidth = currentImageStyles.width ? currentImageStyles.width : '10px';

            // Root styling
            currentImageStyles.fontSize = '1px';
            currentImageStyles.lineHeight = `${parseInt(currentImageHeight % 2)}px`;
            currentImageStyles.padding = `${parseInt(currentImageHeight) * 0.5}px ${parseInt(currentImageWidth) * 0.5}px`;
            currentImageStyles.backgroundSize = `${currentImageHeight} ${currentImageWidth}`;
            currentImageStyles.background = `no-repeat url(${imageSrc})`;
        }
    });

    const consoleStyles = listOfStyles.map(style => {
        if (style === 'resetStyle') return resetStyle;

        const styleAsString = Object.entries(styleObject[style]).map(([key, value]) => {
            // Turning camelCase (from JS) into kebab/dash-case (to CSS)
            let currentKey = key;
            const uppercaseMatch = currentKey.match(/[A-Z]/);
            if (uppercaseMatch) currentKey = currentKey.replace(uppercaseMatch[0], `-${uppercaseMatch[0].toLowerCase()}`);
            return `${currentKey}:${value};`
        }).join('');

        return styleAsString;
    });

    // Log time baby
    const applyToLog = [input].concat(consoleStyles);
    console.log.apply(console, applyToLog);
}
