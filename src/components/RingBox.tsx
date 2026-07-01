type RingBoxProps = {
  open?: boolean
}

export const RingBox = ({ open = false }: RingBoxProps) => {
  return (
    <div className={`ring-scene ${open ? 'ring-scene-open' : ''}`} aria-hidden="true">
      <div className="ring-light" />
      <div className="ring-box">
        <div className="box-lid">
          <div className="lid-inner" />
        </div>

        <div className="ring">
          <div className="diamond">
            <span />
            <span />
            <span />
          </div>
          <div className="band" />
        </div>

        <div className="box-base">
          <div className="velvet" />
          <div className="box-front" />
        </div>
      </div>
    </div>
  )
}
