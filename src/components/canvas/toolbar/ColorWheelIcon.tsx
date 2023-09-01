import { useEffect, useRef } from 'react';

function drawCircle(ctx: CanvasRenderingContext2D, size = 100) {
    const radius = size / 2;
    const image = ctx.createImageData(2 * radius, 2 * radius);
    const data = image.data;

    for (let x = -radius; x < radius; x++) {
        for (let y = -radius; y < radius; y++) {

            const [r, phi] = xy2polar(x, y);

            if (r > radius) {
                // skip all (x,y) coordinates that are outside of the circle
                continue;
            }

            const deg = rad2deg(phi);

            // Figure out the starting index of this pixel in the image data array.
            const rowLength = 2 * radius;
            const adjustedX = x + radius; // convert x from [-50, 50] to [0, 100] (the coordinates of the image data array)
            const adjustedY = y + radius; // convert y from [-50, 50] to [0, 100] (the coordinates of the image data array)
            const pixelWidth = 4; // each pixel requires 4 slots in the data array
            const index = (adjustedX + (adjustedY * rowLength)) * pixelWidth;

            const hue = deg;
            const saturation = r / radius;
            const value = 1.0;

            const [red, green, blue] = hsv2rgb(hue, saturation, value);
            const alpha = 255;

            data[index] = red;
            data[index + 1] = green;
            data[index + 2] = blue;
            data[index + 3] = alpha;
        }
    }

    ctx.putImageData(image, 0, 0);
}

function xy2polar(x: number, y: number) {
    const r = Math.sqrt(x * x + y * y);
    const phi = Math.atan2(y, x);
    return [r, phi];
}

// rad in [-π, π] range
// return degree in [0, 360] range
function rad2deg(rad: number) {
    return ((rad + Math.PI) / (2 * Math.PI)) * 360;
}

// hue in range [0, 360]
// saturation, value in range [0,1]
// return [r,g,b] each in range [0,255]
// See: https://en.wikipedia.org/wiki/HSL_and_HSV#From_HSV
function hsv2rgb(hue: number, saturation: number, value: number) {
    const chroma = value * saturation;
    const hue1 = hue / 60;
    const x = chroma * (1 - Math.abs((hue1 % 2) - 1));
    let r1 = 0, g1 = 0, b1 = 0;
    if (hue1 >= 0 && hue1 <= 1) {
        ([r1, g1, b1] = [chroma, x, 0]);
    } else if (hue1 >= 1 && hue1 <= 2) {
        ([r1, g1, b1] = [x, chroma, 0]);
    } else if (hue1 >= 2 && hue1 <= 3) {
        ([r1, g1, b1] = [0, chroma, x]);
    } else if (hue1 >= 3 && hue1 <= 4) {
        ([r1, g1, b1] = [0, x, chroma]);
    } else if (hue1 >= 4 && hue1 <= 5) {
        ([r1, g1, b1] = [x, 0, chroma]);
    } else if (hue1 >= 5 && hue1 <= 6) {
        ([r1, g1, b1] = [chroma, 0, x]);
    }

    const m = value - chroma;
    const [r, g, b] = [r1 + m, g1 + m, b1 + m];

    // Change r,g,b values from [0,1] to [0,255]
    return [255 * r, 255 * g, 255 * b];
}


type Props = {
    size?: number;
}

const ColorWheelIcon = ({ size = 100 }: Props) => {
    const colorWheelIconRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!colorWheelIconRef.current) return;
        const ctx = colorWheelIconRef.current.getContext('2d');
        drawCircle(ctx, size);
    }, [])

    return (
        <div style={{ width: size, height: size }}>
            <canvas width={size} height={size} ref={colorWheelIconRef} />
        </div>
    )
}

export default ColorWheelIcon;
