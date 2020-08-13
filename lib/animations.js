import fs from "fs";
import path from "path";
import * as matter from "gray-matter";

export const dataPath = path.join(process.cwd(), "data");
export const animationPath = path.join(process.cwd(), "public/animations");

export const getAnimationPaths = () => {
    const paths = [];
    fs.readdirSync(animationPath).forEach(animationFileName => {
        paths.push({
            params: {
                animation: [animationFileName],
            },
        });

        paths.push({
            params: {
                animation: [animationFileName, "capture"],
            },
        });
    });

    return paths;
};

export const getAnimationPath = animationName => {
    return `/animations/${animationName}/script.js`;
};

export const getAnimationData = animationName => {
    const fullPath = path.join(dataPath, `${animationName}.md`);
    return fs.existsSync(fullPath) ? matter(fs.readFileSync(fullPath)).data : {};
};
