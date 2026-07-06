const ASCII_OFFSET = 63;
const CHUNK_MASK = 0x1f;
const CONTINUE_BIT = 0x20;

function decodeSignedValue(
  encoded: string,
  index: number,
): [value: number, nextIndex: number] {
  let result = 0;
  let shift = 0;
  let chunk: number;

  do {
    if (index >= encoded.length) {
      throw new Error('Invalid polyline: unexpected end of string');
    }

    chunk = encoded.charCodeAt(index++) - ASCII_OFFSET;
    result |= (chunk & CHUNK_MASK) << shift;
    shift += 5;
  } while (chunk >= CONTINUE_BIT);

  const value = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;

  return [value, index];
}

export function decodePolyline(
  encoded: string,
  precision = 5,
): [number, number][] {
  if (!encoded) return [];

  const factor = 10 ** precision;
  const points: [number, number][] = [];

  let index = 0;
  let lat = 0;
  let lng = 0;

  while (index < encoded.length) {
    const [deltaLat, indexAfterLat] = decodeSignedValue(encoded, index);
    lat += deltaLat;

    const [deltaLng, indexAfterLng] = decodeSignedValue(encoded, indexAfterLat);
    lng += deltaLng;

    points.push([lat / factor, lng / factor]);
    index = indexAfterLng;
  }

  return points;
}
