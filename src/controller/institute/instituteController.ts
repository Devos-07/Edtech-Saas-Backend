import { NextFunction, Request, Response } from "express";
import sequelize from "../../database/connection";
import generateRandomInstituteNumber from "../../services/generateRandomInstituteNumber";
import { IExtendRequest } from "../../middleware/type";



class InstituteController {
  static async createInstitute(req: IExtendRequest, res: Response,next:NextFunction) {
    console.log(req.user,"Name from miidleware")
    const {
      instituteName,
      instituteEmail,
      institutePhoneNumber,
      instituteAddress,
    } = req.body;
    const instituteVatNo = req.body.instituteVatNo || null;
    const institutePanNo = req.body.institutePanNo || null;
    if (
      !instituteName ||
      !instituteEmail ||
      !institutePhoneNumber ||
      !instituteAddress
    ) {
      res.status(400).json({
        message:
          "Please provide instituteName,instituteEmail,institutePhoneNumber,instituteAddress",
      });
      return;
    }
    //aayo vaney -> insitute create garnya -> institute-123,course-123 ...
    const instituteNumber = generateRandomInstituteNumber();

    await sequelize.query(`
    CREATE TABLE IF NOT EXISTS institute_${instituteNumber}(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    instituteName VARCHAR(255) NOT NULL,
    instituteEmail VARCHAR(255) NOT NULL ,
    institutePhoneNumber VARCHAR(255) NOT NULL ,
    instituteAddress VARCHAR(255) NOT NULL,
    instituteVatNo VARCHAR(255),
    institutePanNo VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )
`);
    await sequelize.query(`INSERT INTO institute_${instituteNumber}(instituteName,instituteEmail,institutePhoneNumber,instituteAddress,instituteVatNo,institutePanNo) VALUES(?,?,?,?,?,?)`,{
      replacements : [instituteName,instituteEmail,institutePhoneNumber,instituteAddress,instituteVatNo,institutePanNo]
     
    })

    res.status(200).json({
      message: "Institute created succesfully!",
      
    });
    next()

  }
  

  // static async createTeacher(req:Request,res:Response){
  //   await sequelize.query(`CREATE TABLE teacher_${instituteNumber}(
  //     id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  //     teacherName VARCHAR(255) NOT NULL,
  //     teacherEmail VARCHAR(255) NOT NULL UNIQUE,
  //     teacherPhoneNumber VARCHAR(255) NOT NULL UNIQUE,
  //     teacherAddress VARCHAR(255) NOT NULL
  //     )`)
  // }
}
export default InstituteController;
