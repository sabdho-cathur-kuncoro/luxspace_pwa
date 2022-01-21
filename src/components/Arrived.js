import ArrivedItem from "./ArrivedItem";

function Arrived({items}) {
  console.log(items);
    return (
        <section className="flex flex-col py-16">
      <div className="container mx-auto mb-4">
        <div className="flex justify-center text-center mb-4">
          <h3 className="text-2xl capitalize font-semibold">
            Just Arrived <br className="" />this summer for you
          </h3>
        </div>
      </div>
      <div className="overflow-x-hidden px-4" id="carousel">
        <div className="container mx-auto"></div>
        {/* <!-- <div className="overflow-hidden z-10"> --> */}
        <div className="flex -mx-4 flex-row relative">
          {/* <!-- START: JUST ARRIVED ROW 1 --> */}
          {items && items.map((item)=> {
            return (
            <ArrivedItem key={item.id} item={item} />
            )
          })}
          {/* <!-- END: JUST ARRIVED ROW 1 --> */}

        </div>
        {/* <!-- </div> --> */}
      </div>
    </section>
    );
}

export default Arrived;