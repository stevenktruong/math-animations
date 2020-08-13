import * as React from "react";
import Head from "next/head";

import { getAnimationPath, getAnimationPaths, getAnimationData } from "lib/animations";

export default class Animation extends React.Component {
    render() {
        return (
            <>
                <Head>
                    <title>{this.props.animationData.title}</title>

                    {/* CCapture.js to create gifs */}
                    <script src="https://unpkg.com/ccapture.js@1.1.0/build/CCapture.all.min.js"></script>

                    {/* p5.js for animations */}
                    <script src="https://cdn.jsdelivr.net/npm/p5@1.1.9/lib/p5.min.js"></script>
                </Head>
                {this.props.capture ? (
                    <div dangerouslySetInnerHTML={{ __html: "<script>const capture = true;</script>" }}></div>
                ) : (
                    <div dangerouslySetInnerHTML={{ __html: "<script>const capture = false;</script>" }}></div>
                )}
                <script src={this.props.animationPath}></script>

                {/* TODO: pre-render LaTeX and use them as images */}
            </>
        );
    }
}

export const getStaticPaths = () => {
    const paths = getAnimationPaths();
    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps = ({ params }) => {
    const animationName = params.animation[0];
    const animationPath = getAnimationPath(animationName);
    const animationData = getAnimationData(animationName);
    const capture = params.animation[1] === "capture";
    return {
        props: {
            animationName,
            animationPath,
            animationData,
            capture,
        },
    };
};
