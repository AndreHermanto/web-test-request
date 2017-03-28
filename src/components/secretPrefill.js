import { hashHistory } from 'react-router';

export default function secretPrefill(component, target) {
  document.onkeydown = (e) => {
    if(e.which === 84 && e.ctrlKey && e.altKey){
      hashHistory.replace(hashHistory.getCurrentLocation().pathname + '?shazam=true');
      window.location.reload();
    }
  }
  
  if(hashHistory.getCurrentLocation().query.shazam) {
    alert('SHAZZZAMM!!! Your form has been magically prefilled.');
    component.setState({
      [target]: testData()
    })
  }
}
                         
function testData() {
  return {
        "OrderTest": {
          "_secretPrefill": true,
          "latestSelectId": "58c74b7c1020a1eb58e9dfae",
          "test": {
            "id": "58c74b7c1020a1eb58e9dfae",
            "label": "Dilated Cardiomyopathy (DCM), Complete Panel",
            "genes": [
              "ACTC1",
              "ACTN2",
              "ALMS1",
              "ANKRD1",
              "BAG3",
              "CRYAB",
              "CSRP3",
              "DES",
              "DMD",
              "DNAJC19",
              "DOLK",
              "DSG2",
              "DSP",
              "EMD",
              "EYA4",
              "FKTN",
              "FLNC",
              "GATAD1",
              "HFE",
              "ILK",
              "JUP",
              "LAMA4",
              "LAMP2",
              "LDB3",
              "LMNA",
              "MYBPC3",
              "MYH6",
              "MYH7",
              "MYPN",
              "NEXN",
              "NKX2-5",
              "OBSCN",
              "PLN",
              "RBM20",
              "SCN5A",
              "SDHA",
              "SGCB",
              "SGCD",
              "SYNE1",
              "SYNE2",
              "TAZ",
              "TCAP",
              "TNNC1",
              "TNNI3",
              "TNNT2",
              "TPM1",
              "TTN",
              "VCL"
            ]
          },
          "genes": [
            "ACTC1",
            "ACTN2",
            "ALMS1",
            "ANKRD1",
            "BAG3",
            "CRYAB",
            "CSRP3",
            "DES",
            "DMD",
            "DNAJC19",
            "DOLK",
            "DSG2",
            "DSP",
            "EMD",
            "EYA4",
            "FKTN",
            "FLNC",
            "GATAD1",
            "HFE",
            "ILK",
            "JUP",
            "LAMA4",
            "LAMP2",
            "LDB3",
            "LMNA",
            "MYBPC3",
            "MYH6",
            "MYH7",
            "MYPN",
            "NEXN",
            "NKX2-5",
            "OBSCN",
            "PLN",
            "RBM20",
            "SCN5A",
            "SDHA",
            "SGCB",
            "SGCD",
            "SYNE1",
            "SYNE2",
            "TAZ",
            "TCAP",
            "TNNC1",
            "TNNI3",
            "TNNT2",
            "TPM1",
            "TTN",
            "VCL"
          ]
        },
        "PatientDetails": {
          "lastName": "asdfadsf",
          "firstName": "asdfas",
          "dob": "2-January-1918",
          "medicalRecordNo": "",
          "gender": "Female",
          "genderOther": "",
          "ethnicity": "",
          "deceased": true,
          "sampleSource": "",
          "consent": true,
        },
        "ClinicalInfo": {
          "clinicalInfo": "adsfasdf",
          "relevantInvestigation": "asdfasdfasdfasdffasdf",
          "familyHistory": "",
          "consanguinity": true
        },
        "FamilyMember": {
          "familyMember": [
            {
              "FamilyMemberDetails": {
                "lastName": "adsfadsf",
                "firstName": "asdf",
                "relationship":'father',
                "dob": "2-February-1917",
                "medicalRecordNo": "123",
                "gender": "Unknown",
                "genderOther": "",
                "ethnicity": "",
                "deceased": true,
                "sampleSource": "",
                "consent": true,
              },
              "FamilyMemberClinicalInfo": {
                "clinicalInfo": "asdfasdf",
                "affected": true,
                "relevantInvestigation": "",
                "familyHistory": "",
                "consanguinity": false
              }
            },
            {
              "FamilyMemberDetails": {
                "lastName": "adsfadsf2",
                "firstName": "asdf2",
                "relationship": "sister",
                "dob": "2-February-1917",
                "medicalRecordNo": "123",
                "gender": "Male",
                "genderOther": "",
                "ethnicity": "",
                "deceased": false,
                "consent": true,
              },
              "FamilyMemberClinicalInfo": {
                "clinicalInfo": "asdfasdf2",
                "affected": true,
                "relevantInvestigation": "",
                "familyHistory": "",
                "consanguinity": false
              }
            }
          ]
        },
        "ClinicianDetails": {
          "providerNumber": "123123AS",
          "medicalSpecialty": "adsf",
          "firstName": "fasdf",
          "lastName": "dfasd",
          "organisation": "sdfas",
          "phone": "123123",
          "email": "a@a.aa",
          "fax": "",
          "copyToHCP": [
            {
              "additionalFirstName": "adsf",
              "additionalLastName": "adsfasd",
              "additionalOrganisation": "asdf",
              "additionalEmail": "a@aa.aa"
            },
            {
              "additionalFirstName": "adsf2",
              "additionalLastName": "adsfasd2",
              "additionalOrganisation": "asdf",
              "additionalEmail": "a@aa.aa"
            }
          ],
          "copy": false
        },
        "BillingInfo": {
          "billOption": "Private",
          "payer": "asdf adsfadsf",
          "phone": "12123",
          "firstName": "asdf",
          "lastName": "adsfadsf",
          "payerEmail": "a@a.aa",
          "consent": true,
          "billPrice": 720
        },
        "Signature": true,
        _secretPrefill: true
      };
} 
