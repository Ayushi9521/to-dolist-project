//configuration
//For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDv8cB2K2Zjp_Erw6UAzhdC2wkCQZnscTE",
  authDomain: "todolist-cc4f4.firebaseapp.com",
  projectId: "todolist-cc4f4",
  storageBucket: "todolist-cc4f4.appspot.com",
  messagingSenderId: "92439943100",
  appId: "1:92439943100:web:1c828ebdaa5a8d51a1fdb9",
  measurementId: "G-7YTG8QH780"
};

//database initialization
	firebase.initializeApp(firebaseConfig);
	
	function add_task(){
		input_box=document.getElementById("input_box");
		console.log("add_task");
		if(input_box.value.length !=0){
			//put data from textbox into database
			var key = firebase.database().ref().child("unfinished_task").push().key;
			var task = {
				id: input_number,
				title: input_box.value,
				key: key
			};
			var updates = {};
			updates["/unfinished_task/" + key]=task;
			firebase.database().ref().update(updates);
		}	
	}
	
	function create_unfinished_task(){
		unfinished_task_container = document.getElementsByClassName("container")[0];
		unfinished_task_container.innerHTML ="";
		
		task_arry = [];
		firebase.database().ref("unfinished_task").once('value', function(snapshot){
			snapshot.forEach(function(childSnapshot){
             var chilkey = childSnapshot.key;
			 var childData = childSnapshot.val();
             task_arry.push(Object.values(childData));
		    });
			 for(var i, i=0; i < task_arry.length; i++){
				 task_id  = task_arry[i][0];
				 task_title = task_arry[i][1];
				 task_key =  task_arry[i][2];
				 // task data
				 task_container = document.createElement("div");
				 task_container.setAttribute("class", "task_container");
				 task_container.setAttribute("data-key", task_key);
				 
				 task_data = document.createElement('div');
				 task_data.setAttribute('id', 'task_data');
				 
				 id = document.createElement('p');
				 id.setAttribute('id','task_number');
				 title.setAttribute('contenteditable',false);
				 id.innerHTML = task_id;
				 
				 title = document.createElement('p');
				 title.setAttribute('id','task_title');
				 title.setAttribute('contenteditable',false);
				 title.innerHTML = task_title;
				 
				 //task tool
				 task_tool = document.createElement('div');
				 task_tool.setAttribute('id', 'task_tool');
				 
				 task_edit_button = document.createElement('button');
				 task_edit_button.setAttribute('id', 'task_edit_button');
				 task_edit_button.setAttribute('onclick', "task_edit(this.parentElement.parentElement,this)");
				 fa_edit = document.createElement('i');
				 fa_edit.setAttribute('class','fa fa-pencil');
				 
		
				  task_delete_button = document.createElement('button');
				 task_delete_button.setAttribute('id', 'task_delete_button');
				 task_delete_button.setAttribute('onclick', "task_delete(this.parentElement.parentElement,this)");
				 fa_delete = document.createElement('i');
				 fa_delete.setAttribute('class','fa fa-trash');
				 
				 
				 unfinished_task_container.append(task_container);
				 task_container.append(task_data);
				 task_data.append(id);
				 task_data.append(title);
				 
				 
				 task_container.append(task_tool);
				 task_tool.append(task_edit_button);
				 task_edit_button.append(fa_edit);
				 task_tool.append(task_delete_button);
				 task_delete_button.append(fa_);
				 
				 
				 
			 }
		});
		
		
		
		
		
	}
	
	function task_edit(task, edit_button){
		edit_button.style.backgroundColor = "#ffed83";
		edit_button.style.color = "#fff";
		edit_button.setAttribute("id", "task_edit_button_editing");
		edit_button.setAttribute("onclick", "finish_edit( this.parentElement.parentElement, this)");
		
		id= task.childNodes[0].childNod4[0];
		id.setAttribute("contenteditable", true);
		
		title= task.childNodes[0].childNod4[1];
		title.setAttribute("contenteditable", true);
		
		console.log("task_edit");
	}
	function finish_edit(task, edit_button){
		edit_button.style.backgroundColor = "#fff";
		edit_button.style.color = "#000";
		
		id= task.childNodes[0].childNod4[0];
		id.setAttribute("contenteditable", false);
		
		title= task.childNodes[0].childNod4[1];
		title.setAttribute("contenteditable", false);
	}
	function task_delete(task){
		key = task.getAttribute("data-key");
		task_to_remove = firebase.database().ref("unfinished_task/" + key);
		task_to_remove.remove();
		// remove from html view
		task.remove();
		console.log("task_delete");
	}
