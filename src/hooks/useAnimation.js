import {readonly, ref} from "vue";

export function useAnimation() {
    const animating = ref(false);

    let makeEaseOut = (timing) => (timeFraction) => 1 - timing(1 - timeFraction);
    let curve = (timeFraction) => Math.pow(timeFraction, 2) * ((1.2 + 1) * timeFraction - 1.2);

    let animate = ({duration, timing, draw}) => {
        let start = 0;
        let timeFraction = 0;
        let progress = 0;

        animating.value = true;
        start = performance.now();

        let animation = (time) => {
            // timeFraction in (0, 1) closed interval
            timeFraction = (time - start) / duration;
            if (timeFraction > 1) timeFraction = 1;

            // current animation state
            progress = timing(timeFraction);

            draw(progress);


            if (timeFraction < 1) {
                requestAnimationFrame(animation);
            } else {
                animating.value = false;
            }
        };

        //used requestAnimationFrame here simply because of stable framerate compared to lodash throttle function
        requestAnimationFrame(animation);
    }

    return {
        makeEaseOut,
        curve,
        animate,
        animating: readonly(animating)
    };
}