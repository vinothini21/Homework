#import flask
from flask import Flask

# 2. Create an app, being sure to pass __name__
app = Flask(__name__)

@app.route("/api/v1.0/stations")
def names():
    """Return a list of all station names"""
    # Query all stations
    results = session.query((Station.name)).all()

    # Convert list of tuples into normal list
    all_names = list(np.ravel(results))

    return jsonify(all_names)

@app.route("/api/v1.0/tobs")
def dates():
    """Return a json list of Temperature Observations (tobs) for the previous year"""
    results = session.query(Measurement.station, Measurement.tobs).order_by(Measurement.tobs.desc()).all()

    # Convert list of tuples into normal list
    all_tobs = list(np.ravel(results))

    return jsonify(all_tobs)

@app.route("/api/v1.0/precipitation")
def temp():
    """Return a json list of dates and Temperature Observations (tobs) for the previous year"""
    results = session.query(Measurement.dates, Measurement.tobs).order_by(Measurement.tobs.desc()).all()

    # Convert list of tuples into normal list
    all_dates_tobs = list(np.ravel(results))

    return jsonify(all_dates_tobs)

@app.route("/api/v1.0/<start")
def dates():
    """Return a json list of min, max and avg with start date"""
    results = session.query(Measurement.tobs).\
                                filter(Measurement.date>=start_date).\
                                group_by(Measurement.date).order_by(Measurement.date).all()
    TMIN = min(results)
    TMAX = max(results)
    TAVG = np.mean(results)

    # Convert list of tuples into normal list
    all_dates = list(np.ravel(results))

    return jsonify(all_dates)

@app.route("/api/v1.0/<start>/<end>")
def dates(start_date, end_date):
    """Return a json list of min, max and avg with start and end dates"""
    results = session.query(Measurement.tobs).\
                                filter(Measurement.date.between(start_date, end_date)).\
                                group_by(Measurement.date).order_by(Measurement.date).all()
    TMIN = min(results)
    TMAX = max(results)
    TAVG = np.mean(results)
    # Convert list of tuples into normal list
    all_dates_st_end = list(np.ravel(results))

    return jsonify(all_dates_st_end)

if __name__ == "__main__":
    app.run(debug=True)
