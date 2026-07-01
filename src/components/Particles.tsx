import { useMemo } from 'react'

type Spark = {
  id: number
  left: string
  top: string
  size: number
  delay: number
  duration: number
}

type Petal = {
  id: number
  left: string
  delay: number
  duration: number
  rotate: number
}

export const Particles = () => {
  const sparks = useMemo<Spark[]>(
    () =>
      Array.from({ length: 76 }, (_, id) => ({
        id,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: 1.4 + Math.random() * 4.8,
        delay: Math.random() * 6,
        duration: 3 + Math.random() * 5,
      })),
    [],
  )

  const petals = useMemo<Petal[]>(
    () =>
      Array.from({ length: 22 }, (_, id) => ({
        id,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 8,
        duration: 5 + Math.random() * 8,
        rotate: Math.random() * 360,
      })),
    [],
  )

  return (
    <>
      {sparks.map(spark => (
        <span
          key={`spark-${spark.id}`}
          className="spark"
          style={{
            left: spark.left,
            top: spark.top,
            width: spark.size,
            height: spark.size,
            animationDelay: `${spark.delay}s`,
            animationDuration: `${spark.duration}s`,
          }}
        />
      ))}

      {petals.map(petal => (
        <span
          key={`petal-${petal.id}`}
          className="petal"
          style={{
            left: petal.left,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
            transform: `rotate(${petal.rotate}deg)`,
          }}
        />
      ))}
    </>
  )
}
