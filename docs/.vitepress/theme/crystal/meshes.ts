/**
 * The two meshes the crystal viewer draws with, in unit space.
 *
 * A sphere of radius 1 at the origin and a cylinder of radius 1 running from y = 0 to y = 1, both
 * indexed and centred on their own axes, so an instance can be placed by a single centre (plus, for
 * the cylinder, two endpoints) and a scale. Everything the viewer shows — atoms, bonds, the frame
 * around the block — comes out of these two.
 */

export interface Mesh {
  positions: Float32Array
  normals: Float32Array
  indices: Uint16Array
}

export function sphereMesh(longitudes = 20, latitudes = 14): Mesh {
  const positions: number[] = []

  for (let latitude = 0; latitude <= latitudes; latitude += 1) {
    const theta = (latitude / latitudes) * Math.PI
    const ring = Math.sin(theta)
    const height = Math.cos(theta)
    for (let longitude = 0; longitude <= longitudes; longitude += 1) {
      const phi = (longitude / longitudes) * Math.PI * 2
      positions.push(ring * Math.cos(phi), height, ring * Math.sin(phi))
    }
  }

  const indices: number[] = []
  for (let latitude = 0; latitude < latitudes; latitude += 1) {
    for (let longitude = 0; longitude < longitudes; longitude += 1) {
      const a = latitude * (longitudes + 1) + longitude
      const b = a + longitudes + 1
      indices.push(a, b, a + 1, b, b + 1, a + 1)
    }
  }

  const normals = Float32Array.from(positions)
  return {
    positions: Float32Array.from(positions),
    normals,
    indices: Uint16Array.from(indices),
  }
}

export function cylinderMesh(segments = 18): Mesh {
  const positions: number[] = []
  const normals: number[] = []
  const indices: number[] = []

  // The shaft: two rings, each with a repeated seam vertex so the cap fans stay independent.
  for (const height of [0, 1]) {
    for (let segment = 0; segment <= segments; segment += 1) {
      const phi = (segment / segments) * Math.PI * 2
      const x = Math.cos(phi)
      const z = Math.sin(phi)
      positions.push(x, height, z)
      normals.push(x, 0, z)
    }
  }

  for (let segment = 0; segment < segments; segment += 1) {
    const a = segment
    const b = segment + 1
    const c = segments + 1 + segment
    const d = segments + 1 + segment + 1
    indices.push(a, c, b, b, c, d)
  }

  // The caps, so a bond seen end-on is a disc rather than a hole.
  for (const height of [0, 1]) {
    const centre = positions.length / 3
    positions.push(0, height, 0)
    normals.push(0, height === 0 ? -1 : 1, 0)

    const ring = positions.length / 3
    for (let segment = 0; segment <= segments; segment += 1) {
      const phi = (segment / segments) * Math.PI * 2
      positions.push(Math.cos(phi), height, Math.sin(phi))
      normals.push(0, height === 0 ? -1 : 1, 0)
    }

    for (let segment = 0; segment < segments; segment += 1) {
      indices.push(centre, ring + segment, ring + segment + 1)
    }
  }

  return {
    positions: Float32Array.from(positions),
    normals: Float32Array.from(normals),
    indices: Uint16Array.from(indices),
  }
}
