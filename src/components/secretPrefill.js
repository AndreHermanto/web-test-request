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
    "orderTestModule": {
        "test": {
            "id": "58c74b7c1020a1eb58e9dfac",
            "label": "Dilated Cardiomyopathy (DCM), Core Panel",
            "genes": [
                "ACTC1",
                "BAG3",
                "CRYAB",
                "CSRP3",
                "DES",
                "DMD",
                "DSG2",
                "DSP",
                "FLNC",
                "HFE",
                "ILK",
                "LAMA4",
                "LAMP2",
                "LDB3",
                "LMNA",
                "MYBPC3",
                "MYH7",
                "NEXN",
                "NKX2-5",
                "PLN",
                "RBM20",
                "SCN5A",
                "TAZ",
                "TNNC1",
                "TNNI3",
                "TNNT2",
                "TPM1",
                "TTN",
                "VCL"
            ]
        }
    },
    "patientDetailsModule": {
        "lastName": "Agudo",
        "firstName": "Joshua",
        "dob": "2020-02-02",
        "medicalRecordNo": "",
        "gender": "Male",
        "genderOther": "",
        "ethnicity": "Filipino",
        "deceased": false,
        "sampleSource": "",
        "consent": true
    },
    "clinicalInfoModule": {
        "clinicalInfo": "Here is some clinical information",
        "affected": false,
        "relevantInvestigation": "",
        "familyHistory": "",
        "consanguinity": false
    },
    "familyMembersModule": {
        "familyMembers": [
            {
                "familyMemberDetails": {
                    "lastName": "Blah",
                    "firstName": "Mother",
                    "dob": "2020-02-02",
                    "medicalRecordNo": "adsa",
                    "gender": "Female",
                    "genderOther": "",
                    "ethnicity": "",
                    "deceased": false,
                    "sampleSource": "",
                    "consent": true
                },
                "familyMemberClinicalInfo": {
                    "clinicalInfo": "adssda",
                    "affected": true,
                    "relevantInvestigation": "",
                    "familyHistory": "",
                    "consanguinity": false
                }
            }
        ]
    },
    "clinicianDetailsModule": {
        "providerNumber": "123123",
        "medicalSpecialty": "IBD",
        "firstName": "Boaty",
        "lastName": "McBoatFace",
        "organisation": "Garvan Institute",
        "phone": "12390098123",
        "email": "slkjs@alkjs.com",
        "fax": "",
        "copy": false,
        "copyToHCP": [
                {
                    "firstName": "Hello",
                    "lastName": "World",
                    "organisation": "Some organisation",
                    "email": "hello@world.com"
                }
        ],
    },
    "billingInfoModule": {
        "billOption": "Private",
        "payer": "Joshua Agudo",
        "phone": "1231232131",
        "firstName": "Joshua",
        "lastName": "Agudo",
        "payerEmail": "joshua.agudo@genome.one",
        "consent": true
    },
    "signature": false
}
} 
