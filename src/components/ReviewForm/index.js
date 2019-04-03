import React from 'react';

const handleSubmit = (event, onSubmit, review) => {
    const { score, tastingNotes, yearPredict, pricePredict, wine, taster, pairing } = event.target;
    event.preventDefault();
    const submitObject = {
        review: {
            score: parseInt(score.value ? score.value: review.score),
            tastingNotes: {set:tastingNotes.value ? tastingNotes.value: review.tastingNotes},
            yearPredict: parseInt(yearPredict.value ? yearPredict.value: review.yearPredict),
            pricePredict: parseFloat(pricePredict.value ? pricePredict.value: review.pricePredict),
            wine: {update:{name: wine.value ? wine.value: review.wine.name}},
            wineTaster: {update:{name:taster.value ? taster.value: review.wineTaster.name}},
            pairing: pairing.value ? pairing.value: review.pairing,
        },
        id: review.id,
    }
    onSubmit(submitObject);
};

const ReviewForm = ({ review, onSubmit }) => (
     <form onSubmit={(event) => handleSubmit(event, onSubmit, review)} className="d-inline">
        <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Tasting Notes</label>
                <input type="text" className="form-control" name="tastingNotes" id="tastingNotes" 
                    placeholder={review.tastingNotes || ''}
                />
            </div>                            
            <br />
            <div className="form-group">
                <label htmlFor="Winery">Wine</label>
                <input type="text" className="form-control" name="wine" id="wine" 
                    placeholder={review.wine.name ||  ''}
                />
            </div>
            <div className="form-group">
                <label htmlFor="year">Tasters</label>
                <input type="text" className="form-control" name="taster" id="taster" 
                    placeholder={review.wineTaster.name || ''}
                />
            </div>
            <br />
            <div className="form-group">
                <label htmlFor="alcohol">Year Predict</label>
                <input type="text" className="form-control" name="yearPredict" id="yearPredict" 
                    placeholder={review.yearPredict || ''}
                />
            </div>
            <div className="form-group">
                <label htmlFor="alcohol">Score</label>
                <input type="number" className="form-control" name="score" id="score" 
                    placeholder={review.score || ''}
                />
            </div>
            <div className="form-group">
                <label htmlFor="alcohol">Price Predict</label>
                <input type="text" className="form-control" name="pricePredict" id="pricePredict" 
                    placeholder={review.pricePredict || ''}
                />
            </div>
            <div className="form-group">
                <label htmlFor="alcohol">Pairing</label>
                <input type="text" className="form-control" name="pairing" id="pairing" 
                    placeholder={review.pairing || ''}
                />
            </div>
            <button className="btn btn-outline-secondary">Update</button>
        </form>
);

export default ReviewForm;

