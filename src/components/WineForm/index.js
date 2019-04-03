import React from 'react';

const handleSubmit = (event, onSubmit, wine) => {
    const { target } = event;
    event.preventDefault();
    const submitObject = {
        id: wine.id,
        name: target.name.value ? target.name.value: wine.name,
        winery: target.Winery.value ? target.Winery.value: wine.Winery,
        year: target.year.value ? target.year.value: wine.year,
        alcohol: target.year.value ? target.year.value: wine.year,
        image: target.image.value ? target.image.value: wine.image,
        price: target.price.value ? target.price.value: wine.price,
        size: target.size.value ? target.size.value: wine.size,
    }
    onSubmit(wine, submitObject);
};

const WineForm = ({ wine, onSubmit }) => (
     <form onSubmit={(event) => handleSubmit(event, onSubmit, wine)}>
        <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Name</label>
                <input type="text" className="form-control" name="name" id="exampleFormControlInput1" 
                    placeholder={wine.name}
                />
            </div>                            
            <br />
            <div className="form-group">
                <label htmlFor="Winery">Winery</label>
                <input type="text" className="form-control" name="Winery" id="Winery" 
                    placeholder={wine.winery}
                />
            </div>
            <div className="form-group">
                <label htmlFor="year">year</label>
                <input type="text" className="form-control" name="year" id="year" 
                    placeholder={wine.year}
                />
            </div>
            <br />
            <div className="form-group">
                <label htmlFor="alcohol">alcohol</label>
                <input type="text" className="form-control" name="alcohol" id="alcohol" 
                    placeholder={wine.alcohol}
                />
            </div>
            <div className="form-group">
                <label htmlFor="image">image</label>
                <input type="text" className="form-control" name="image" id="image" 
                    placeholder={wine.image}
                />
            </div>
            <div className="form-group">
                <label htmlFor="price">price</label>
                <input type="text" className="form-control" name="price" id="price" 
                    placeholder={wine.price}
                />
            </div>
            <div className="form-group">
                <label htmlFor="size">size</label>
                <input type="text" className="form-control" name="size" id="size" 
                    placeholder={wine.size}
                />
            </div>
            <div className="form-group">
                <label htmlFor="color">color</label>
                <input type="text" className="form-control" name="color" id="color" 
                    placeholder={wine.color}
                />
            </div>

            <button className="btn btn-outline-secondary">Update!</button>
        </form>
);

export default WineForm;

