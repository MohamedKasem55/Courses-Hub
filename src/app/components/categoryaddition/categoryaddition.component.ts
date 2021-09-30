import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-categoryaddition',
  templateUrl: './categoryaddition.component.html',
  styleUrls: ['./categoryaddition.component.css']
})
export class CategoryadditionComponent implements OnInit {
categoryForm:FormGroup;
allCategories;
/* @ViewChild('flag') flag: any;

 */  
/* selectedCategory:any;

 */
@ViewChild('delete') deleteModal
deleteId=""
selectedName:string;
 selectedId:string;
 editable:string;
constructor(private db :AngularFirestore,private fb:FormBuilder,private modalService :NgbModal) {
    this.categoryForm=this.fb.group({
      categoryName:new FormControl('',Validators.required),
    })
    this.allCategories=[];
/*     this.selectedCategory={
      id:'',
      data:''
    }; */
    this.selectedName='';
    this.selectedId='';
    this.editable='Add Category';
   }

  ngOnInit(): void {

     this.db.collection('categories').snapshotChanges().subscribe((res) => {
      this.allCategories = res.map((e) => {
        return {
          id: e.payload.doc.id,
          data: e.payload.doc.data(),
        };
      });
    }); 


  }
addCategory(){
  let newCategory=this.categoryForm.value;
 if(this.selectedId=='')
    this.db.collection('categories').add(newCategory);
  else 
    this.db.collection('categories').doc(this.selectedId).set(newCategory);
  this.reset();

  
}
editCategory(id){
/*   this.flag.value= id;
 */ 
this.selectedId=id;  
this.selectedName=this.allCategories.find(e=>e.id==id).data.categoryName;  
this.editable='Update Category';
 }
deleteCategory(){
  this.db.collection('categories').doc(this.deleteId).delete();
  this.deleteId=""
  this.reset();
}
reset(){
  this.editable='Add Category';
  this.categoryForm.reset();
  this.selectedId='';
  console.log(this.selectedId);
  
}

deleteDisplay(id){
  this.deleteId=id;
  this.modalService.open(this.deleteModal,{ centered: true, size: 'lg' })
  
    }
  noDeleteCategory(){
    this.deleteId=""
  }
}
