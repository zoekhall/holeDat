import PotholeIMG from './../db/schema/potholeImgs.schema'


const getAllImgs = (cb) => {
  PotholeIMG.findAll({})
    .then((data) => cb(data))
    .catch((err) => console.error(err));
};


export default getAllImgs
