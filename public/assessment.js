// create our angular app and inject ngAnimate and ui-router 
// =============================================================================
var app = angular.module('formApp',
		[ 'ngAnimate', 'ui.router', 'mm.foundation' ]);

// configuring our routes
// =============================================================================
app.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider

	// route to show our basic form (/form)
	.state('form', {
		url : '/form',
		templateUrl : 'form.html',
		controller : 'formController'
	})

	// nested states
	// each of these sections will have their own view
	// url will be nested (/form/profile)
	.state('form.profile', {
		url : '/profile',
		templateUrl : 'form-profile.html'

	})

	.state('errorLoginPage', {
		url : '/errorLoginPage',
		templateUrl : 'errorLoginPage.html'

	})

	.state('thankyoupage', {
		url : '/thankyou',
		templateUrl : 'ThankYouPage.html'

	})

	.state('register', {
		url : '/register',
		templateUrl : 'Register.html'

	})

	.state('forgotPassword', {
		url : '/forgotPassword',
		templateUrl : 'forgotPassword.html'

	})

	// url will be /form/interests
	.state('form.interests', {
		url : '/interests',
		templateUrl : 'form-interests.html'
	})

	.state('form.microservices', {
		url : '/microservices',
		templateUrl : 'form-microservices.html'

	})

	.state('projectDetails', {
		url : '/projectDetails',
		templateUrl : 'form-projectDetails.html'

	})

	.state('login', {
		url : '/login',
		templateUrl : 'Login.html'

	})

	// url will be /form/payment
	.state('form.payment', {
		url : '/payment',
		templateUrl : 'form-payment.html'
	});

	// catch all route
	// send users to the form page
	$urlRouterProvider.otherwise('/login');
})

function sticky_relocate() {
	var window_top = $(window).scrollTop();
	var div_top = $('#sticky-anchor').offset().top;
	if (window_top > div_top) {
		$('#sticky').addClass('stick');
		$('#sticky-anchor').height($('#sticky').outerHeight());
	} else {
		$('#sticky').removeClass('stick');
		$('#sticky-anchor').height(0);
	}
}

$(function() {
	$(window).scroll(sticky_relocate);
	sticky_relocate();
});
// our controller for the form
// =============================================================================
app
		.controller(
				'formController',
				function($window, $rootScope, $scope, $http, $state) {

					
					$rootScope.AddSelectedMaturityLevel = function(subcategory,
							SelectedOption, subcategoryId) {
						var object = {
							name : '',
							subcategoryId : '',
							maturityLevel : ''
						};
						$rootScope.SelectedMaturityLevel[subcategory] = [];
						object.name = subcategory;
						object.subcategoryId = subcategoryId;
						object.maturityLevel = SelectedOption;
						if (SelectedOption === undefined) {
						} else {
							$rootScope.SelectedMaturityLevel[subcategory]
									.push(object);

							if ($rootScope.subCategoryArray.length === 0) {
								$rootScope.subCategoryArray.push(subcategory);
							}
							var i=0;
							var checkSubCategoryArrayPush=false;
							while(i< $rootScope.subCategoryArray.length)
								{
								if ($rootScope.subCategoryArray[i]===subcategory) {
									checkSubCategoryArrayPush=true;
									break;
								}
								i++;
								}
							if(!checkSubCategoryArrayPush)
								{
								$rootScope.subCategoryArray
								.push(subcategory);
								}
							/*for (var i = 0; i < $rootScope.subCategoryArray.length; i++) {
								if ($rootScope.subCategoryArray[i] === subcategory) {
								} else {
									$rootScope.subCategoryArray
											.push(subcategory);
									break;
								}

							}*/
						}
						console
								.dir($rootScope.SelectedMaturityLevel[subcategory]);

					};

					var a = '';
					$rootScope.saveCommentBox = function(subcategoryName,
							comment, subcategoryId) {
						var object = {
							Comment : '',
							subcategoryId : '',
							subCategoryName : ''
						};
						if (comment == undefined) {
							console.dir("hello");
						} else {
							object.Comment = comment;
							object.subcategoryId = subcategoryId;
							object.subCategoryName = subcategoryName;

							$rootScope.SelectedMaturityLevel[subcategoryName]
									.push(object);
							console
									.dir($rootScope.SelectedMaturityLevel[subcategoryName]);
						}

					};

					a = '';

					$scope.onExit = function() {
						$window
								.alert("While closing the screen your Data is saved automatically");
					};
					$window.onbeforeunload = $scope.onExit

					$scope.counter = 0;
					$rootScope.listOfCheckedQuestions = [];
					$scope.randomNumber = Math.round((Math.random() * 10) * 10);
					console.dir("random number:");

					console.dir($scope.randomNumber);

					$scope.processForm = function() {
						var finalJsonObjectarray = {};
						var objectFinalList = {
							projectId : '',
							ObjectFinal : []
						}
						console.dir($rootScope.commentName);
						console.dir($rootScope.listOfCheckedQuestions);

						var ObjectFinal = {
							listOfselectedQuestions : [],
							// projectId:'',
							subCategoryName : '',
							SubCategoryID : '',
							MaturityLevel : '',
							Comments : ''
						};

						console.dir(Object);

						for (var i = 0; i < $rootScope.subCategoryArray.length; i++) {
							var n = 0;

							ObjectFinal = {
								listOfselectedQuestions : [],
								// projectId:'',
								subCategoryName : '',
								SubCategoryID : '',
								MaturityLevel : '',
								Comments : ''
							};

							ObjectFinal.subCategoryName = $rootScope.subCategoryArray[i];
							// ObjectFinal.projectId=$rootScope.projectidTest;
							ObjectFinal.SubCategoryID = $rootScope.SelectedMaturityLevel[$rootScope.subCategoryArray[i]][0].subcategoryId;
							ObjectFinal.MaturityLevel = $rootScope.SelectedMaturityLevel[$rootScope.subCategoryArray[i]][0].maturityLevel;
							ObjectFinal.Comments = $rootScope.commentName[$rootScope.subCategoryArray[i]];
							var j = 0;
							while (n < $rootScope.listOfCheckedQuestions.length) {
								console.dir("value");
								console.dir(n);
								if ($rootScope.subCategoryArray[i] === $rootScope.listOfCheckedQuestions[n].Subcategory) {
									ObjectFinal.listOfselectedQuestions
											.push($rootScope.listOfCheckedQuestions[n].QuestionId)

								}
								n++;

							}
							objectFinalList.ObjectFinal.push(ObjectFinal);
						}
						objectFinalList.projectId = $rootScope.projectidTest;
						finalJsonObjectarray = objectFinalList;
						console.dir("hi");
						console.dir(ObjectFinal);
						console.dir(finalJsonObjectarray);
						console.dir("json" + JSON.stringify(objectFinalList));
						$http.post('http://localhost:8087/assessment/0/save', objectFinalList).then(
								function(response) {
									if(response.data)
										{
										//alert("Saved the Test");
										$state.go('thankyoupage');
										}

								});
						/*$http.post('http://localhost:8087/assessment/0/save ',
								objectFinalList);
						console.dir(finalJsonObjectarray);
						console.dir("processform" + objectFinalList);*/
						
						//$state.go('thankyoupage');
					}

					var questionObject = {
						name : '',
						id : '',
						score : ''
					};
					$scope.count = 1;
					$scope.oneAtATime = true;
					$scope.Arr = [];
					/*
					 * $scope.names = [ {value:'Regression',notAnOption: true},
					 * {value:'Repeatable',notAnOption: false}, {value:
					 * 'Consistent',notAnOption: false}, {value:'Quantitatively
					 * Measured'} ,{value:'Optimizing'} ];
					 */

					$scope.names = [ 'Regression', 'Repeatable', 'Consistent',
							'Quantitatively Measured', 'Optimizing' ];

					$scope.collapseAll = function(data) {
						for ( var i in $scope.accordianData) {
							if ($scope.accordianData[i] != data) {
								$scope.accordianData[i].expanded = false;
							}
						}
						data.expanded = !data.expanded;
					};

					// we will store all of our form data in this object
					$scope.formData = {};
					$scope.rootArea = {};
					$scope.category = {};

					var obj = {
						name : '',
						url : ''
					};
					var subObj = {
						name : ''
					};

					$scope.arr = [];
					$scope.cat = [];
					$scope.subCategory = [];
					$scope.questions = [];
					var uri = [ {
						"url" : ".profile"
					}, {
						"url" : ".interests"
					}, {
						"url" : ".payment"
					}, {
						"url" : ".microservices"
					} ];
					$scope.selectedname={};
					$http
							.get('http://localhost:8087/assessment/'+$rootScope.projectidTest)
							.then(
									function(response) {
										$rootScope.rootArea = response.data;
										console.dir($rootScope.rootArea);
										for (var i = 0; i < $rootScope.rootArea.length; i++) {
											obj = {
												name : '',
												url : ''
											};
											obj.name = $rootScope.rootArea[i].name;
											obj.url = uri[i].url;
											$scope.arr.push(obj);

										}
										for (var i = 0; i < $scope.arr.length && $scope.arr.length==4; i++) {
											for(var k=0;k<$rootScope.rootArea[i].categories.length;k++)
											{
											for(var p=0;p<$rootScope.rootArea[i].categories[k].subCategories.length;p++)
												{
												console.dir("maturity level after modified"+$rootScope.rootArea[i].categories[k].subCategories[p].maturityLevel);
												if($rootScope.rootArea[i].categories[k].subCategories[p].maturityLevel!=null)
													{
													$scope.selectedname[$rootScope.rootArea[i].categories[k].subCategories[p].name]=$rootScope.rootArea[i].categories[k].subCategories[p].maturityLevel;
													console.dir($scope.selectedname[$rootScope.rootArea[i].categories[k].subCategories[p].name]);
													
													}
												if($rootScope.rootArea[i].categories[k].subCategories[p].comments!=null){
													console.dir("modified comments"+$rootScope.rootArea[i].categories[k].subCategories[p].comments);
													$scope.commentName[$rootScope.rootArea[i].categories[k].subCategories[p].name]=$rootScope.rootArea[i].categories[k].subCategories[p].comments;
												}
												}
											}
										}
										
									});
					

					$scope.subCategoryinfo = {};

					$scope.myFunc = function(selectedName, subcategoryname,
							categoryname) {
						console.log(selectedName);
						$scope.Arr = {'Dev Quality' : {},
								'Unit Testing' : {},
								'Build' : {},
								'Deploy' : {},
								'NFR (Non Func Req) Testing' : {},
								'Automated Testing' : {},
								'Project Release Strategy' : {},
								'Testing Gates' : {},
								'DB Versioning & Change Management' : {},
								'Performance Regression Test' : {},
								'Functional Regression Test' : {},
								'Package and Deploy' : {},
								'Checkout, Build and Unit test' : {},
								'Infrastructure Monitoring' : {},
								'Logging Insights' : {},
								'End User Monitoring' : {},
								'Application Performance Monitoring' : {},
								'Infrastructure Code and Configuration' : {},
								'Automated Provisioning' : {},
								'Immutable Infrastructure' : {},
								'Project Collaboration & Community' : {},
								'Service Desk' : {},
								'Overall Release Management' : {},
								'Application Release Strategy' : {},
								'Data Release Strategy' : {},
								'Team Collaboration' : {},
								'Deployment Frequency (test/stage/prod)' : {},
								'Change Lead Time' : {},
								'Change Failure Rate' : {},
								'Mean Time To Recover (MTTR)' : {},
								'Design Principles' : {},
								'Database Independence' : {},
								'Integration' : {},
								'Independent Build Infrastructure' : {},
								'Independent Deployments' : {},
								'Versioning' : {},
								'Immutable Infrastructure' : {}
								};

						$scope.regressive = [];
						$scope.repeatable = [];
						$scope.consistent = [];
						$scope.QUANTITATIVELY_MEASURED = [];
						$scope.OPTIMIZING = [];
						$scope.subCategoryinfo = subcategoryname;

						if (categoryname === 'Project / Release Management') {
							categoryname = 'Project Release Management';
						}

						$http
								.get(
										'http://localhost:8087/Continous Delivery/'
												+ categoryname + '/'
												+ subcategoryname+'/'+$rootScope.projectidTest)
								.then(
										function(response) {
											$scope.ContinuousIntegrationQuestions = response.data;

											for (var i = 0; i < $scope.ContinuousIntegrationQuestions.length; i++) {
												console
														.dir($scope.ContinuousIntegrationQuestions[i].maturityRating);
												switch ($scope.ContinuousIntegrationQuestions[i].maturityRating) {
												case "REGRESSIVE":
													questionObject = {
														name : '',
														id : '',
														score : '',
														checked:''
													};
													questionObject.name = $scope.ContinuousIntegrationQuestions[i].name;
													questionObject.id = $scope.ContinuousIntegrationQuestions[i].questionKey.id;
													questionObject.score = -1;
													questionObject.checked=$scope.ContinuousIntegrationQuestions[i].checked;
													if(!(questionObject.checked))
														{
														for(var j=0;j<$rootScope.listOfCheckedQuestions.length;j++)
															{
															if($rootScope.listOfCheckedQuestions[j].Subcategory==subcategoryname){
																if($rootScope.listOfCheckedQuestions[j].QuestionId==questionObject.id)
																	{
																	questionObject.checked=true;
																	}
															}
															}
														}
													$scope.regressive
															.push(questionObject);
													// console.log(questionObject);
													break;

												case "REPEATABLE":
													questionObject = {
														name : '',
														id : '',
														score : '',
														checked:''
													};
													questionObject.name = $scope.ContinuousIntegrationQuestions[i].name;
													questionObject.id = $scope.ContinuousIntegrationQuestions[i].questionKey.id;
													questionObject.score = 0;
													questionObject.checked=$scope.ContinuousIntegrationQuestions[i].checked;
													if(!(questionObject.checked))
													{
													for(var j=0;j<$rootScope.listOfCheckedQuestions.length;j++)
														{
														if($rootScope.listOfCheckedQuestions[j].Subcategory==subcategoryname){
															if($rootScope.listOfCheckedQuestions[j].QuestionId==questionObject.id)
																{
																questionObject.checked=true;
																}
														}
														}
													}
													console.dir("inside myfun checking question checked");
													console.dir(questionObject.checked);
													console.dir($scope.ContinuousIntegrationQuestions[i].checked);
													$scope.repeatable
															.push(questionObject);
													break;

												case "CONSISTENT":
													questionObject = {
														name : '',
														id : '',
														score : '',
														checked:''
													};
													questionObject.name = $scope.ContinuousIntegrationQuestions[i].name;
													questionObject.id = $scope.ContinuousIntegrationQuestions[i].questionKey.id;
													questionObject.score = 1;
													questionObject.checked=$scope.ContinuousIntegrationQuestions[i].checked;
													if(!(questionObject.checked))
													{
													for(var j=0;j<$rootScope.listOfCheckedQuestions.length;j++)
														{
														if($rootScope.listOfCheckedQuestions[j].Subcategory==subcategoryname){
															if($rootScope.listOfCheckedQuestions[j].QuestionId==questionObject.id)
																{
																questionObject.checked=true;
																}
														}
														}
													}
													$scope.consistent
															.push(questionObject);
													break;

												case "QUANTITATIVELY_MEASURED":
													questionObject = {
														name : '',
														id : '',
														score : '',
														checked:''
													};
													questionObject.name = $scope.ContinuousIntegrationQuestions[i].name;
													questionObject.id = $scope.ContinuousIntegrationQuestions[i].questionKey.id;
													questionObject.score = 2;
													questionObject.checked=$scope.ContinuousIntegrationQuestions[i].checked;
													if(!(questionObject.checked))
													{
													for(var j=0;j<$rootScope.listOfCheckedQuestions.length;j++)
														{
														if($rootScope.listOfCheckedQuestions[j].Subcategory==subcategoryname){
															if($rootScope.listOfCheckedQuestions[j].QuestionId==questionObject.id)
																{
																questionObject.checked=true;
																}
														}
														}
													}
													$scope.QUANTITATIVELY_MEASURED
															.push(questionObject);
													break;

												case "OPTIMIZING":
													questionObject = {
														name : '',
														id : '',
														score : '',
														checked:''
													};
													questionObject.name = $scope.ContinuousIntegrationQuestions[i].name;
													questionObject.id = $scope.ContinuousIntegrationQuestions[i].questionKey.id;
													questionObject.score = 3;
													questionObject.checked=$scope.ContinuousIntegrationQuestions[i].checked;
													if(!(questionObject.checked))
													{
													for(var j=0;j<$rootScope.listOfCheckedQuestions.length;j++)
														{
														if($rootScope.listOfCheckedQuestions[j].Subcategory==subcategoryname){
															if($rootScope.listOfCheckedQuestions[j].QuestionId==questionObject.id)
																{
																questionObject.checked=true;
																}
														}
														}
													}
													$scope.OPTIMIZING
															.push(questionObject);
													break;

												}
												console
														.dir($scope.regressive.length);

											}
										});

						switch (subcategoryname) {

						case 'Dev Quality':

							switch (selectedName) {

							case 'Regression':

								$scope.Arr[subcategoryname][selectedName] = $scope.regressive;
								console.dir("hi");
								console.dir($scope.Arr[subcategoryname][selectedName]);
								break;

							case 'Repeatable':
								$scope.Arr[subcategoryname][selectedName] = $scope.repeatable;
								console.dir("hi");
								console.dir($scope.Arr);
								break;

							case 'Consistent':
								$scope.Arr[subcategoryname][selectedName] = $scope.consistent;
								console.dir($scope.Arr);
								break;

							case 'Optimizing':
								$scope.Arr[subcategoryname][selectedName]= $scope.OPTIMIZING;
								console.dir($scope.Arr);
								break;

							case 'Quantitatively Measured':
								$scope.Arr[subcategoryname][selectedName] = $scope.QUANTITATIVELY_MEASURED;
								console.dir($scope.Arr);
								break;

							}

							break;

						case 'Unit Testing':

							switch (selectedName) {
							case 'Regression':

								$scope.Arr[subcategoryname][selectedName] = $scope.regressive;
								console.dir($scope.Arr);
								break;

							case 'Repeatable':
								$scope.Arr[subcategoryname][selectedName] = $scope.repeatable;
								console.dir($scope.Arr);
								break;

							case 'Consistent':
								$scope.Arr[subcategoryname][selectedName]= $scope.consistent;
								console.dir($scope.Arr);
								break;

							case 'Optimizing':
								$scope.Arr[subcategoryname][selectedName]= $scope.OPTIMIZING;
								console.dir($scope.Arr);
								break;

							case 'Quantitatively Measured':
								$scope.Arr[subcategoryname][selectedName]= $scope.QUANTITATIVELY_MEASURED;
								console.dir($scope.Arr);
								break;

							}

							break;

						case 'Build':

							switch (selectedName) {
							case 'Regression':

								$scope.Arr[subcategoryname][selectedName]= $scope.regressive;
								console.dir($scope.Arr);
								break;

							case 'Repeatable':
								$scope.Arr[subcategoryname][selectedName] = $scope.repeatable;
								console.dir($scope.Arr);
								break;

							case 'Consistent':
								$scope.Arr[subcategoryname][selectedName] = $scope.consistent;
								console.dir($scope.Arr);
								break;

							case 'Optimizing':
								$scope.Arr[subcategoryname][selectedName] = $scope.OPTIMIZING;
								console.dir($scope.Arr);
								break;

							case 'Quantitatively Measured':
								$scope.Arr[subcategoryname][selectedName] = $scope.QUANTITATIVELY_MEASURED;
								console.dir($scope.Arr);
								break;

							}

							break;

						case 'Deploy':

							switch (selectedName) {
							case 'Regression':

								$scope.Arr[subcategoryname][selectedName] = $scope.regressive;
								console.dir($scope.Arr);
								break;

							case 'Repeatable':
								$scope.Arr[subcategoryname][selectedName] = $scope.repeatable;
								console.dir($scope.Arr);
								break;

							case 'Consistent':
								$scope.Arr[subcategoryname][selectedName] = $scope.consistent;
								console.dir($scope.Arr);
								break;

							case 'Optimizing':
								$scope.Arr[subcategoryname][selectedName] = $scope.OPTIMIZING;
								console.dir($scope.Arr);
								break;

							case 'Quantitatively Measured':
								$scope.Arr[subcategoryname][selectedName] = $scope.QUANTITATIVELY_MEASURED;
								console.dir($scope.Arr);
								break;

							}

							break;

						case 'Automated Testing':
							switch (selectedName) {
							case 'Regression':

								$scope.Arr[subcategoryname][selectedName] = $scope.regressive;
								console.dir($scope.Arr);
								break;

							case 'Repeatable':
								$scope.Arr[subcategoryname][selectedName] = $scope.repeatable;
								console.dir($scope.Arr);
								break;

							case 'Consistent':
								$scope.Arr[subcategoryname][selectedName] = $scope.consistent;
								console.dir($scope.Arr);
								break;

							case 'Optimizing':
								$scope.Arr[subcategoryname][selectedName] = $scope.OPTIMIZING;
								console.dir($scope.Arr);
								break;

							case 'Quantitatively Measured':
								$scope.Arr[subcategoryname][selectedName] = $scope.QUANTITATIVELY_MEASURED;
								console.dir($scope.Arr);
								break;

							}

							break;

						case 'NFR (Non Func Req) Testing':
							switch (selectedName) {
							case 'Regression':

								$scope.Arr[subcategoryname][selectedName] = $scope.regressive;
								console.dir($scope.Arr);
								break;

							case 'Repeatable':
								$scope.Arr[subcategoryname][selectedName] = $scope.repeatable;
								console.dir($scope.Arr);
								break;

							case 'Consistent':
								$scope.Arr[subcategoryname][selectedName] = $scope.consistent;
								console.dir($scope.Arr);
								break;

							case 'Optimizing':
								$scope.Arr[subcategoryname][selectedName] = $scope.OPTIMIZING;
								console.dir($scope.Arr);
								break;

							case 'Quantitatively Measured':
								$scope.Arr[subcategoryname][selectedName] = $scope.QUANTITATIVELY_MEASURED;
								console.dir($scope.Arr);
								break;

							}

							break;

						case 'Project Release Strategy':
							switch (selectedName) {
							case 'Regression':

								$scope.Arr[subcategoryname][selectedName] = $scope.regressive;
								console.dir($scope.Arr);
								break;

							case 'Repeatable':
								$scope.Arr[subcategoryname][selectedName] = $scope.repeatable;
								console.dir($scope.Arr);
								break;

							case 'Consistent':
								$scope.Arr[subcategoryname][selectedName] = $scope.consistent;
								console.dir($scope.Arr);
								break;

							case 'Optimizing':
								$scope.Arr[subcategoryname][selectedName] = $scope.OPTIMIZING;
								console.dir($scope.Arr);
								break;

							case 'Quantitatively Measured':
								$scope.Arr[subcategoryname][selectedName] = $scope.QUANTITATIVELY_MEASURED;
								console.dir($scope.Arr);
								break;

							}

							break;

						case 'Testing Gates':
							switch (selectedName) {
							case 'Regression':

								$scope.Arr[subcategoryname][selectedName] = $scope.regressive;
								console.dir($scope.Arr);
								break;

							case 'Repeatable':
								$scope.Arr[subcategoryname][selectedName] = $scope.repeatable;
								console.dir($scope.Arr);
								break;

							case 'Consistent':
								$scope.Arr[subcategoryname][selectedName] = $scope.consistent;
								console.dir($scope.Arr);
								break;

							case 'Optimizing':
								$scope.Arr[subcategoryname][selectedName] = $scope.OPTIMIZING;
								console.dir($scope.Arr);
								break;

							case 'Quantitatively Measured':
								$scope.Arr[subcategoryname][selectedName] = $scope.QUANTITATIVELY_MEASURED;
								console.dir($scope.Arr);
								break;

							}

							break;

						case 'DB Versioning & Change Management':
							switch (selectedName) {
							case 'Regression':

								$scope.Arr[subcategoryname][selectedName] = $scope.regressive;
								console.dir($scope.Arr);
								break;

							case 'Repeatable':
								$scope.Arr[subcategoryname][selectedName] = $scope.repeatable;
								console.dir($scope.Arr);
								break;

							case 'Consistent':
								$scope.Arr[subcategoryname][selectedName] = $scope.consistent;
								console.dir($scope.Arr);
								break;

							case 'Optimizing':
								$scope.Arr[subcategoryname][selectedName] = $scope.OPTIMIZING;
								console.dir($scope.Arr);
								break;

							case 'Quantitatively Measured':
								$scope.Arr[subcategoryname][selectedName] = $scope.QUANTITATIVELY_MEASURED;
								console.dir($scope.Arr);
								break;

							}

							break;

						case 'Checkout, Build and Unit test':
							switch (selectedName) {
							case 'Regression':

								$scope.Arr[subcategoryname][selectedName] = $scope.regressive;
								console.dir($scope.Arr);
								break;

							case 'Repeatable':
								$scope.Arr[subcategoryname][selectedName] = $scope.repeatable;
								console.dir($scope.Arr);
								break;

							case 'Consistent':
								$scope.Arr[subcategoryname][selectedName] = $scope.consistent;
								console.dir($scope.Arr);
								break;

							case 'Optimizing':
								$scope.Arr[subcategoryname][selectedName] = $scope.OPTIMIZING;
								console.dir($scope.Arr);
								break;

							case 'Quantitatively Measured':
								$scope.Arr[subcategoryname][selectedName] = $scope.QUANTITATIVELY_MEASURED;
								console.dir($scope.Arr);
								break;

							}

							break;

						case 'Package and Deploy':
							switch (selectedName) {
							case 'Regression':

								$scope.Arr[subcategoryname][selectedName] = $scope.regressive;
								console.dir($scope.Arr);
								break;

							case 'Repeatable':
								$scope.Arr[subcategoryname][selectedName] = $scope.repeatable;
								console.dir($scope.Arr);
								break;

							case 'Consistent':
								$scope.Arr[subcategoryname][selectedName] = $scope.consistent;
								console.dir($scope.Arr);
								break;

							case 'Optimizing':
								$scope.Arr[subcategoryname][selectedName] = $scope.OPTIMIZING;
								console.dir($scope.Arr);
								break;

							case 'Quantitatively Measured':
								$scope.Arr[subcategoryname][selectedName] = $scope.QUANTITATIVELY_MEASURED;
								console.dir($scope.Arr);
								break;

							}

							break;

						case 'Functional Regression Test':
							switch (selectedName) {
							case 'Regression':

								$scope.Arr[subcategoryname][selectedName] = $scope.regressive;
								console.dir($scope.Arr);
								break;

							case 'Repeatable':
								$scope.Arr[subcategoryname][selectedName] = $scope.repeatable;
								console.dir($scope.Arr);
								break;

							case 'Consistent':
								$scope.Arr[subcategoryname][selectedName] = $scope.consistent;
								console.dir($scope.Arr);
								break;

							case 'Optimizing':
								$scope.Arr[subcategoryname][selectedName] = $scope.OPTIMIZING;
								console.dir($scope.Arr);
								break;

							case 'Quantitatively Measured':
								$scope.Arr[subcategoryname][selectedName] = $scope.QUANTITATIVELY_MEASURED;
								console.dir($scope.Arr);
								break;

							}

							break;

						case 'Performance Regression Test':
							switch (selectedName) {
							case 'Regression':

								$scope.Arr[subcategoryname][selectedName] = $scope.regressive;
								console.dir($scope.Arr);
								break;

							case 'Repeatable':
								$scope.Arr[subcategoryname][selectedName] = $scope.repeatable;
								console.dir($scope.Arr);
								break;

							case 'Consistent':
								$scope.Arr[subcategoryname][selectedName] = $scope.consistent;
								console.dir($scope.Arr);
								break;

							case 'Optimizing':
								$scope.Arr[subcategoryname][selectedName] = $scope.OPTIMIZING;
								console.dir($scope.Arr);
								break;

							case 'Quantitatively Measured':
								$scope.Arr[subcategoryname][selectedName] = $scope.QUANTITATIVELY_MEASURED;
								console.dir($scope.Arr);
								break;

							}

							break;
							$scope.Arr[subcategoryname]['Regression'];
						}

					};
					$scope.score = [];
					var total = 0;
					/* $rootScope.commentName =[]; */
					var checkboxChecked = [];
					var count = 0;
					var checkboxChecked = [];
					var proxyarr = {
						'Dev Quality' : [],
						'Unit Testing' : [],
						'Build' : [],
						'Deploy' : [],
						'NFR (Non Func Req) Testing' : [],
						'Automated Testing' : [],
						'Project Release Strategy' : [],
						'Testing Gates' : [],
						'DB Versioning & Change Management' : [],
						'Performance Regression Test' : [],
						'Functional Regression Test' : [],
						'Package and Deploy' : [],
						'Checkout, Build and Unit test' : []
					};
					var proxyarr1 = [];
					var checkBoxProxy = [];
					var subcategoryinfo = 'Dev Quality';
					/*var questionIdsChecked = {
						'Dev Quality' : [],
						'Unit Testing' : [],
						'Build' : [],
						'Deploy' : [],
						'NFR (Non Func Req) Testing' : [],
						'Automated Testing' : [],
						'Project Release Strategy' : [],
						'Testing Gates' : [],
						'DB Versioning & Change Management' : [],
						'Performance Regression Test' : [],
						'Functional Regression Test' : [],
						'Package and Deploy' : [],
						'Checkout, Build and Unit test' : []
					};*/

					/*
					 * $rootScope.saveObject ={ClientId : '', listOfQuestions :
					 * '', projectId : '', subCategory{maturityLevel:'',
					 * CommentBox:'', subcategoryId:''}};
					 */
					$rootScope.listOfModifiedUncheckedQuestion=[];
					$scope.myscore = function(checkboxName, isChecked,
							commentsName, subcategoryname, questionId) {
						console.dir("sdhbfsdhbf");
						console.dir(questionId);
						//console.dir("jjj");
						console.log("hello"
								+ $scope.commentName[subcategoryname]);
						//console.log("hello" + $scope.commentName);
						/*
						 * if(subcategoryinfo!=subcategoryname) { proxyarr=[]; }
						 */
						checkBoxProxy[subcategoryname] = proxyarr[subcategoryname];

						var object = {
							Subcategory : '',
							QuestionId : ''
						};

						if (isChecked) {
							object.Subcategory = subcategoryname;
							object.QuestionId = questionId;
							//$rootScope.listOfCheckedQuestions.push(object);
							if($rootScope.listOfCheckedQuestions.length==0){
								$rootScope.listOfCheckedQuestions.push(object);
							}
							else{
							var i=0;
							var checkIfQuestionIdAlreadyPushed=true;
							while(i<$rootScope.listOfCheckedQuestions.length){
								if($rootScope.listOfCheckedQuestions[i].QuestionId==object.QuestionId)
									{
									checkIfQuestionIdAlreadyPushed=false;
									break;
									}
									
									
								i++;
							}
							
							if(checkIfQuestionIdAlreadyPushed){
								$rootScope.listOfCheckedQuestions.push(object);
								}
							}
							
							checkboxChecked[count] = checkboxName;
							checkBoxProxy[subcategoryname].push(checkboxName);
							console.dir("Hi");
							console.dir(checkBoxProxy[subcategoryname]);
							console.dir(checkboxChecked.length);
							count++;
							if (Window.commentsName === undefined) {
								commentsName = "";
							}
							if ($rootScope.commentName[subcategoryname] == null) {
								// do something with foo
								$rootScope.commentName[subcategoryname] = "";
							}

							/*
							 * $rootScope.commentName[subcategoryname] =
							 * commentsName +
							 * $rootScope.commentName[subcategoryname] + "\n" ;
							 * 
							 * $rootScope.commentName[subcategoryname]='';
							 * proxyarr1=checkBoxProxy[subcategoryname]; for(var
							 * t=0;t<checkBoxProxy[subcategoryname].length;t++)
							 * {if(checkBoxProxy[subcategoryname][t]!=='')
							 * $rootScope.commentName[subcategoryname]=$rootScope.commentName[subcategoryname]+"\n"+checkBoxProxy[subcategoryname][t]; }
							 */

							console
									.dir($rootScope.commentName[subcategoryname]);
							console
									.dir($rootScope.commentName[subcategoryname]);
							console
									.dir($rootScope.commentName[subcategoryname]);
							console.dir(commentsName);
							subcategoryinfo = subcategoryname;
							$scope.$apply();

						} else {
							object.Subcategory = subcategoryname;
							object.QuestionId = questionId;
							console.dir("hi1");
							console.dir(checkBoxProxy[subcategoryname]);
							console.dir("hi1");
							if($rootScope.listOfCheckedQuestions.length==0)
								{
								$rootScope.listOfModifiedUncheckedQuestion.push(object);
								console.dir("Modified unchecked question");
								console.dir($rootScope.listOfModifiedUncheckedQuestion);
								}
							for (var j = 0; j < $rootScope.listOfCheckedQuestions.length; j++) {
									
								if ($rootScope.listOfCheckedQuestions[j].QuestionId === questionId) {
									//$rootScope.listOfCheckedQuestions[j] = '';
									$rootScope.listOfCheckedQuestions.splice(j,1);
									console.dir("removed unchecked question id"+$rootScope.listOfCheckedQuestions);
									console.dir($rootScope.listOfCheckedQuestions);
									break;
								}
								else{
									$rootScope.listOfModifiedUncheckedQuestion.push(object);
									console.dir("Modified uncheck question");
									console.dir($rootScope.listOfModifiedUncheckedQuestion);
								}

							}

							/*
							 * for (var j = 0; j <
							 * checkBoxProxy[subcategoryname].length; j++) { if
							 * (checkBoxProxy[subcategoryname][j] ===
							 * checkboxName) {
							 * checkBoxProxy[subcategoryname][j]='';
							 * 
							 * $rootScope.commentName[subcategoryname]='';
							 * 
							 * for(var t=0;t<checkBoxProxy[subcategoryname].length;t++) {
							 * if(checkBoxProxy[subcategoryname][t]!=='')
							 * $rootScope.commentName[subcategoryname]=$rootScope.commentName[subcategoryname]+"\n"+checkBoxProxy[subcategoryname][t]; }
							 * 
							 * checkboxChecked=checkboxChecked.slice(0,j)+checkboxChecked.slice(j+1,checkboxChecked.length+1);
							 * console.log(checkboxChecked); console
							 * .log("checkbox checked values present"); var
							 * index = $rootScope.commentName[subcategoryname]
							 * .indexOf(checkboxName);
							 * 
							 * $rootScope.commentName[subcategoryname] =
							 * $rootScope.commentName[subcategoryname] .slice(0,
							 * index) + $rootScope.commentName[subcategoryname]
							 * .slice(index+checkboxName.length);
							 * 
							 * $rootScope.commentName[subcategoryname]=$rootScope.commentName[subcategoryname]-checkboxName;
							 * console.dir($rootScope.commentName);
							 * subcategoryinfo=subcategoryname; $scope.$apply();
							 *  } }
							 */

						}
						/*
						 * for(var k=0; k<checkboxChecked.length; k++)){
						 * console.log(checkboxChecked[k]); }
						 */
						console.log(checkboxName);
						console.dir(isChecked);

					};

					$http
							.get(
									'http://localhost:8087/assessmentByName/Continous Delivery')
							.then(
									function(response) {

										$scope.category = response.data;

										for (var j = 0; j < $scope.category.categories.length; j++) {
											obj = {
												name : '',
												url : ''
											};

											obj.name = $scope.category.categories[j].name;

											$scope.cat.push(obj);
											/*
											 * for(var i=0;i<$scope.category.categories[j].subCategories.length;i++){ }
											 */

											/* $scope.subCategory.push(obj); */

										}

										/*
										 * for(var j=0;j<$scope.category.categories.subCategories.length;j++) {
										 * obj = {name:'' ,url:''};
										 * console.dir($scope.category.categories.subCategories[j]); }
										 */

										// console.dir("category array
										// "+$scope.category);
									});

					$scope.validateformprofile = function() {
						$rootScope.listOfCheckedQuestionsSubcategory = [];
						for (var i = 0; i < $rootScope.listOfCheckedQuestions.length; i++) {
							console
									.dir("inside"
											+ $rootScope.listOfCheckedQuestions[i].Subcategory
											+ "");
							if ($rootScope.listOfCheckedQuestionsSubcategory.length == 0) {
								$rootScope.listOfCheckedQuestionsSubcategory
										.push($rootScope.listOfCheckedQuestions[i].Subcategory);
							} else {
								var k = 0;
								var check = true;
								while (k < $rootScope.listOfCheckedQuestionsSubcategory.length) {
									if ($rootScope.listOfCheckedQuestionsSubcategory[k] === $rootScope.listOfCheckedQuestions[i].Subcategory) {
										check = false;
									}
									k++;
								}
								if (check) {
									$rootScope.listOfCheckedQuestionsSubcategory
											.push($rootScope.listOfCheckedQuestions[i].Subcategory);
								}

							}
							console.dir($rootScope.listOfCheckedQuestionsSubcategory);
						}
						var check1=false;
						var i=0;
						while(i < $rootScope.listOfCheckedQuestionsSubcategory.length){
						//for (var i = 0; i < $rootScope.listOfCheckedQuestionsSubcategory.length; i++) {
						if ($rootScope.SelectedMaturityLevel[$rootScope.listOfCheckedQuestionsSubcategory[i]].length == 0) {
							check1=true;
							break;
						}
						i++;
						}
						if(!check1){
							$state.go('form.interests');
						}
						$rootScope.$on('$stateChangeStart', function(
								event, toState, toParams, fromState,
								fromParams) {
							if (check1)
								{
								alert("Enter maturity level of subcategory if options are selected");
								event.preventDefault();
								}
							
								
							

						});
						
						//document.getElementById("status").innerHTML = "Enter maturity level for subcategory!"
						
							
							
						
						/*
						for (var i = 0; i < $rootScope.listOfCheckedQuestions.length; i++) {
							console
									.dir("inside validate form"
											+ $rootScope.listOfCheckedQuestions[i].Subcategory
											+ "");
							if ($rootScope.SelectedMaturityLevel[$rootScope.listOfCheckedQuestions[i].Subcategory].length == 0) {
								$rootScope.$on('$stateChangeStart', function(
										event, toState, toParams, fromState,
										fromParams) {
									if (toState.name != 'form.interests')
										event.preventDefault();

								});
							} else {
								$state.go('form.interests');
							}
						}*/

					};
				});

app
		.controller(
				'formsecondController',
				function($rootScope, $scope, $http) {

					$scope.Infrastructure = {};
					$http
							.get(
									'http://localhost:8087/assessmentByName/Infrastructure On Demand')
							.then(function(response) {
								$scope.Infrastructure = response.data;

							});
					$scope.gotoId = function(id) {
						$location.hash(id);

						// call $anchorScroll()
						$anchorScroll();
					};

					$rootScope.AddSelectedMaturityLevel = function(subcategory,
							SelectedOption, subcategoryId) {
						var object = {
							name : '',
							subcategoryId : '',
							maturityLevel : ''
						};
						$rootScope.SelectedMaturityLevel[subcategory] = [];
						object.name = subcategory;
						object.subcategoryId = subcategoryId;
						object.maturityLevel = SelectedOption;
						console.dir("selectname"+SelectedOption);
						if (SelectedOption === undefined) {
						} else {
							$rootScope.SelectedMaturityLevel[subcategory]
									.push(object);

							if ($rootScope.subCategoryArray.length === 0) {
								$rootScope.subCategoryArray.push(subcategory);
							}
							var i=0;
							var checkSubCategoryArrayPush=false;
							while(i< $rootScope.subCategoryArray.length)
								{
								if ($rootScope.subCategoryArray[i]===subcategory) {
									checkSubCategoryArrayPush=true;
									break;
								}
								i++;
								}
							if(!checkSubCategoryArrayPush)
								{
								$rootScope.subCategoryArray
								.push(subcategory);
								}
							/*for (var i = 0; i < $rootScope.subCategoryArray.length; i++) {
								if ($rootScope.subCategoryArray[i] === subcategory) {
								} else {
									$rootScope.subCategoryArray
											.push(subcategory);
									break;
								}

							}*/
						}

						console
								.dir($rootScope.SelectedMaturityLevel[subcategory]);

					};
					var questionObject = {
						name : '',
						id : '',
						score : ''
					};
					$scope.count = 1;
					$scope.oneAtATime = true;
					$scope.Arr = [];

					$scope.names = [ "Regression", "Repeatable", "Consistent",
							"Quantitatively Measured", "Optimizing" ];
					$scope.Projectnames = [];

					$scope.collapseAll = function(data) {
						for ( var i in $scope.accordianData) {
							if ($scope.accordianData[i] != data) {
								$scope.accordianData[i].expanded = false;
							}
						}
						data.expanded = !data.expanded;
					};

					// we will store all of our form data in this object
					$scope.formData = {};
					$scope.rootArea = {};
					$scope.category = {};

					var obj = {
						name : '',
						url : ''
					};
					var subObj = {
						name : ''
					};

					$scope.arr = [];
					$scope.cat = [];
					$scope.subCategory = [];
					$scope.questions = [];
					var uri = [ {
						"url" : ".profile"
					}, {
						"url" : ".interests"
					}, {
						"url" : ".payment"
					}, {
						"url" : ".microservices"
					} ];

					$http
							.get('http://localhost:8087/assessment/0')
							.then(
									function(response) {
										$scope.rootArea = response.data;

										for (var i = 0; i < $scope.rootArea.length; i++) {
											obj = {
												name : '',
												url : ''
											};
											obj.name = $scope.rootArea[i].name;
											obj.url = uri[i].url;
											$scope.arr.push(obj);

										}

									});
					// $scope.kl = $scope.selectedName
					// console.dir(params.selectedName);

					$scope.subCategoryinfo = {};

					$scope.myFunc = function(selectedName, subcategoryname,
							categoryname) {

						$scope.Arr = {'Dev Quality' : {},
								'Unit Testing' : {},
								'Build' : {},
								'Deploy' : {},
								'NFR (Non Func Req) Testing' : {},
								'Automated Testing' : {},
								'Project Release Strategy' : {},
								'Testing Gates' : {},
								'DB Versioning & Change Management' : {},
								'Performance Regression Test' : {},
								'Functional Regression Test' : {},
								'Package and Deploy' : {},
								'Checkout, Build and Unit test' : {},
								'Infrastructure Monitoring' : {},
								'Logging Insights' : {},
								'End User Monitoring' : {},
								'Application Performance Monitoring' : {},
								'Infrastructure Code and Configuration' : {},
								'Automated Provisioning' : {},
								'Immutable Infrastructure' : {},
								'Project Collaboration & Community' : {},
								'Service Desk' : {},
								'Overall Release Management' : {},
								'Application Release Strategy' : {},
								'Data Release Strategy' : {},
								'Team Collaboration' : {},
								'Deployment Frequency (test/stage/prod)' : {},
								'Change Lead Time' : {},
								'Change Failure Rate' : {},
								'Mean Time To Recover (MTTR)' : {},
								'Design Principles' : {},
								'Database Independence' : {},
								'Integration' : {},
								'Independent Build Infrastructure' : {},
								'Independent Deployments' : {},
								'Versioning' : {},
								'Immutable Infrastructure' : {}
								};
						$scope.regressive = [];
						$scope.repeatable = [];
						$scope.consistent = [];
						$scope.QUANTITATIVELY_MEASURED = [];
						$scope.OPTIMIZING = [];
						$scope.subCategoryinfo = subcategoryname;
						if (categoryname === 'Project / Release Management') {
							categoryname = 'Project Release Management';
						}

						$http
								.get(
										'http://localhost:8087/Infrastructure On Demand/'
												+ categoryname + '/'
												+ subcategoryname+'/'+$rootScope.projectidTest)
								.then(
										function(response) {
											$scope.ContinuousIntegrationQuestions = response.data;

											for (var i = 0; i < $scope.ContinuousIntegrationQuestions.length; i++) {
												console
														.dir($scope.ContinuousIntegrationQuestions[i].maturityRating);
												switch ($scope.ContinuousIntegrationQuestions[i].maturityRating) {
												case "REGRESSIVE":
													questionObject = {
														name : '',
														id : '',
														score : '',
														checked:''
													};
													questionObject.name = $scope.ContinuousIntegrationQuestions[i].name;
													questionObject.id = $scope.ContinuousIntegrationQuestions[i].questionKey.id;
													questionObject.score = -1;
													questionObject.checked=$scope.ContinuousIntegrationQuestions[i].checked;
													if(!(questionObject.checked))
													{
													for(var j=0;j<$rootScope.listOfCheckedQuestions.length;j++)
														{
														if($rootScope.listOfCheckedQuestions[j].Subcategory==subcategoryname){
															if($rootScope.listOfCheckedQuestions[j].QuestionId==questionObject.id)
																{
																questionObject.checked=true;
																}
														}
														}
													}
													$scope.regressive
															.push(questionObject);
													// console.log(questionObject);
													break;

												case "REPEATABLE":
													questionObject = {
														name : '',
														id : '',
														score : '',
														checked:''
													};
													questionObject.name = $scope.ContinuousIntegrationQuestions[i].name;
													questionObject.id = $scope.ContinuousIntegrationQuestions[i].questionKey.id;
													questionObject.score = 0;
													questionObject.checked=$scope.ContinuousIntegrationQuestions[i].checked;
													if(!(questionObject.checked))
													{
													for(var j=0;j<$rootScope.listOfCheckedQuestions.length;j++)
														{
														if($rootScope.listOfCheckedQuestions[j].Subcategory==subcategoryname){
															if($rootScope.listOfCheckedQuestions[j].QuestionId==questionObject.id)
																{
																questionObject.checked=true;
																}
														}
														}
													}
													$scope.repeatable
															.push(questionObject);
													break;

												case "CONSISTENT":
													questionObject = {
														name : '',
														id : '',
														score : '',
														checked:''
													};
													questionObject.name = $scope.ContinuousIntegrationQuestions[i].name;
													questionObject.id = $scope.ContinuousIntegrationQuestions[i].questionKey.id;
													questionObject.score = 1;
													questionObject.checked=$scope.ContinuousIntegrationQuestions[i].checked;
													if(!(questionObject.checked))
													{
													for(var j=0;j<$rootScope.listOfCheckedQuestions.length;j++)
														{
														if($rootScope.listOfCheckedQuestions[j].Subcategory==subcategoryname){
															if($rootScope.listOfCheckedQuestions[j].QuestionId==questionObject.id)
																{
																questionObject.checked=true;
																}
														}
														}
													}
													$scope.consistent
															.push(questionObject);
													break;

												case "QUANTITATIVELY_MEASURED":
													questionObject = {
														name : '',
														id : '',
														score : '',
														checked:''
													};
													questionObject.name = $scope.ContinuousIntegrationQuestions[i].name;
													questionObject.id = $scope.ContinuousIntegrationQuestions[i].questionKey.id;
													questionObject.score = 2;
													questionObject.checked=$scope.ContinuousIntegrationQuestions[i].checked;
													if(!(questionObject.checked))
													{
													for(var j=0;j<$rootScope.listOfCheckedQuestions.length;j++)
														{
														if($rootScope.listOfCheckedQuestions[j].Subcategory==subcategoryname){
															if($rootScope.listOfCheckedQuestions[j].QuestionId==questionObject.id)
																{
																questionObject.checked=true;
																}
														}
														}
													}
													$scope.QUANTITATIVELY_MEASURED
															.push(questionObject);
													break;

												case "OPTIMIZING":
													questionObject = {
														name : '',
														id : '',
														score : '',
														checked:''
													};
													questionObject.name = $scope.ContinuousIntegrationQuestions[i].name;
													questionObject.id = $scope.ContinuousIntegrationQuestions[i].questionKey.id;
													questionObject.score = 3;
													questionObject.checked=$scope.ContinuousIntegrationQuestions[i].checked;
													if(!(questionObject.checked))
													{
													for(var j=0;j<$rootScope.listOfCheckedQuestions.length;j++)
														{
														if($rootScope.listOfCheckedQuestions[j].Subcategory==subcategoryname){
															if($rootScope.listOfCheckedQuestions[j].QuestionId==questionObject.id)
																{
																questionObject.checked=true;
																}
														}
														}
													}
													$scope.OPTIMIZING
															.push(questionObject);
													break;

												}
												console
														.dir($scope.regressive.length);

											}
										});

						switch (subcategoryname) {

						case 'Immutable Infrastructure':

							switch (selectedName) {
							case 'Regression':

								$scope.Arr[subcategoryname][selectedName] = $scope.regressive;
								console.dir($scope.Arr);
								break;

							case 'Repeatable':
								$scope.Arr[subcategoryname][selectedName] = $scope.repeatable;
								console.dir($scope.Arr);
								break;

							case 'Consistent':
								$scope.Arr[subcategoryname][selectedName] = $scope.consistent;
								console.dir($scope.Arr);
								break;

							case 'Optimizing':
								$scope.Arr[subcategoryname][selectedName] = $scope.OPTIMIZING;
								console.dir($scope.Arr);
								break;

							case 'Quantitatively Measured':
								$scope.Arr[subcategoryname][selectedName] = $scope.QUANTITATIVELY_MEASURED;
								console.dir($scope.Arr);
								break;

							}

							break;

						case 'Automated Provisioning':

							switch (selectedName) {
							case 'Regression':

								$scope.Arr[subcategoryname][selectedName] = $scope.regressive;
								console.dir($scope.Arr);
								break;

							case 'Repeatable':
								$scope.Arr[subcategoryname][selectedName] = $scope.repeatable;
								console.dir($scope.Arr);
								break;

							case 'Consistent':
								$scope.Arr[subcategoryname][selectedName] = $scope.consistent;
								console.dir($scope.Arr);
								break;

							case 'Optimizing':
								$scope.Arr[subcategoryname][selectedName] = $scope.OPTIMIZING;
								console.dir($scope.Arr);
								break;

							case 'Quantitatively Measured':
								$scope.Arr[subcategoryname][selectedName] = $scope.QUANTITATIVELY_MEASURED;
								console.dir($scope.Arr);
								break;

							}

							break;

						case 'Infrastructure Code and Configuration':

							switch (selectedName) {
							case 'Regression':

								$scope.Arr[subcategoryname][selectedName] = $scope.regressive;
								console.dir($scope.Arr);
								break;

							case 'Repeatable':
								$scope.Arr[subcategoryname][selectedName] = $scope.repeatable;
								console.dir($scope.Arr);
								break;

							case 'Consistent':
								$scope.Arr[subcategoryname][selectedName] = $scope.consistent;
								console.dir($scope.Arr);
								break;

							case 'Optimizing':
								$scope.Arr[subcategoryname][selectedName] = $scope.OPTIMIZING;
								console.dir($scope.Arr);
								break;

							case 'Quantitatively Measured':
								$scope.Arr[subcategoryname][selectedName] = $scope.QUANTITATIVELY_MEASURED;
								console.dir($scope.Arr);
								break;

							}

							break;

						case 'Application Performance Monitoring':

							switch (selectedName) {
							case 'Regression':

								$scope.Arr[subcategoryname][selectedName] = $scope.regressive;
								console.dir($scope.Arr);
								break;

							case 'Repeatable':
								$scope.Arr[subcategoryname][selectedName] = $scope.repeatable;
								console.dir($scope.Arr);
								break;

							case 'Consistent':
								$scope.Arr[subcategoryname][selectedName] = $scope.consistent;
								console.dir($scope.Arr);
								break;

							case 'Optimizing':
								$scope.Arr[subcategoryname][selectedName] = $scope.OPTIMIZING;
								console.dir($scope.Arr);
								break;

							case 'Quantitatively Measured':
								$scope.Arr[subcategoryname][selectedName] = $scope.QUANTITATIVELY_MEASURED;
								console.dir($scope.Arr);
								break;

							}

							break;

						case 'End User Monitoring':
							switch (selectedName) {
							case 'Regression':

								$scope.Arr[subcategoryname][selectedName] = $scope.regressive;
								console.dir($scope.Arr);
								break;

							case 'Repeatable':
								$scope.Arr[subcategoryname][selectedName] = $scope.repeatable;
								console.dir($scope.Arr);
								break;

							case 'Consistent':
								$scope.Arr[subcategoryname][selectedName] = $scope.consistent;
								console.dir($scope.Arr);
								break;

							case 'Optimizing':
								$scope.Arr[subcategoryname][selectedName] = $scope.OPTIMIZING;
								console.dir($scope.Arr);
								break;

							case 'Quantitatively Measured':
								$scope.Arr[subcategoryname][selectedName] = $scope.QUANTITATIVELY_MEASURED;
								console.dir($scope.Arr);
								break;

							}

							break;

						case 'Logging Insights':
							switch (selectedName) {
							case 'Regression':

								$scope.Arr[subcategoryname][selectedName] = $scope.regressive;
								console.dir($scope.Arr);
								break;

							case 'Repeatable':
								$scope.Arr[subcategoryname][selectedName] = $scope.repeatable;
								console.dir($scope.Arr);
								break;

							case 'Consistent':
								$scope.Arr[subcategoryname][selectedName] = $scope.consistent;
								console.dir($scope.Arr);
								break;

							case 'Optimizing':
								$scope.Arr[subcategoryname][selectedName] = $scope.OPTIMIZING;
								console.dir($scope.Arr);
								break;

							case 'Quantitatively Measured':
								$scope.Arr[subcategoryname][selectedName] = $scope.QUANTITATIVELY_MEASURED;
								console.dir($scope.Arr);
								break;

							}

							break;

						case 'Infrastructure Monitoring':
							switch (selectedName) {
							case 'Regression':

								$scope.Arr[subcategoryname][selectedName] = $scope.regressive;
								console.dir($scope.Arr);
								break;

							case 'Repeatable':
								$scope.Arr[subcategoryname][selectedName] = $scope.repeatable;
								console.dir($scope.Arr);
								break;

							case 'Consistent':
								$scope.Arr[subcategoryname][selectedName] = $scope.consistent;
								console.dir($scope.Arr);
								break;

							case 'Optimizing':
								$scope.Arr[subcategoryname][selectedName] = $scope.OPTIMIZING;
								console.dir($scope.Arr);
								break;

							case 'Quantitatively Measured':
								$scope.Arr[subcategoryname][selectedName] = $scope.QUANTITATIVELY_MEASURED;
								console.dir($scope.Arr);
								break;

							}

							break;

						}

					};
					$scope.score = [];
					var total = 0;

					var checkboxChecked = [];
					var count = 0;
					var checkboxChecked = [];
					var proxyarr = {
						'Infrastructure Monitoring' : [],
						'Logging Insights' : [],
						'End User Monitoring' : [],
						'Application Performance Monitoring' : [],
						'Infrastructure Code and Configuration' : [],
						'Automated Provisioning' : [],
						'Immutable Infrastructure' : []

					};
					var proxyarr1 = [];
					var checkBoxProxy = [];
					var subcategoryinfo = 'Dev Quality';
					var listOfCheckedQuestions = [];
					/* var questionObj={questionId='' , } */

					$scope.myscore = function(checkboxName, isChecked,
							commentsName, subcategoryname, questionId) {
						console.dir("sdhbfsdhbf");
						console.dir(questionId);
						console.dir("jjj");
						console.log("hello"
								+ $scope.commentName[subcategoryname]);
						console.log("hello" + $scope.commentName);
						/*
						 * if(subcategoryinfo!=subcategoryname) { proxyarr=[]; }
						 */
						checkBoxProxy[subcategoryname] = proxyarr[subcategoryname];

						var object = {
							Subcategory : '',
							QuestionId : ''
						};

						if (isChecked) {
							object.Subcategory = subcategoryname;
							object.QuestionId = questionId;
							//$rootScope.listOfCheckedQuestions.push(object);
							if($rootScope.listOfCheckedQuestions.length==0){
								$rootScope.listOfCheckedQuestions.push(object);
							}
							else{
							var i=0;
							var checkIfQuestionIdAlreadyPushed=true;
							while(i<$rootScope.listOfCheckedQuestions.length){
								if($rootScope.listOfCheckedQuestions[i].QuestionId==object.QuestionId)
									{
									checkIfQuestionIdAlreadyPushed=false;
									break;
									}
									
									
								i++;
							}
							
							if(checkIfQuestionIdAlreadyPushed){
								$rootScope.listOfCheckedQuestions.push(object);
								}
							}
							/*
							 * $rootScope.saveObject ={ ClientId : '', projectId :
							 * '', listOfQuestions : [], subCategory{
							 * maturityLevel:'', CommentBox:'',
							 * subcategoryId:''} };
							 * 
							 * 
							 * 
							 * 
							 * 
							 * 
							 * 
							 * $rootScope.saveObject.ClientId=$rootScope.projectDetails.Client_id.id;
							 * $rootScope.saveObject.listOfQuestions=$rootScope.listOfCheckedQuestions;
							 * $rootScope.saveObject.projectId=$rootScope.projectDetails.projects.project_id.id;
							 */

							//questionIdsChecked[subcategoryname]
							checkboxChecked[count] = checkboxName;
							checkBoxProxy[subcategoryname].push(checkboxName);
							console.dir("Hi");
							console.dir(checkBoxProxy[subcategoryname]);
							console.dir("Hi");
							console.dir(checkboxChecked.length);
							count++;
							if (Window.commentsName === undefined) {
								commentsName = "";
							}
							if ($rootScope.commentName[subcategoryname] == null) {
								// do something with foo
								$rootScope.commentName[subcategoryname] = "";
							}

							/*
							 * $rootScope.commentName[subcategoryname] =
							 * commentsName +
							 * $rootScope.commentName[subcategoryname] + "\n" ;
							 * 
							 * $rootScope.commentName[subcategoryname]='';
							 * proxyarr1=checkBoxProxy[subcategoryname]; for(var
							 * t=0;t<checkBoxProxy[subcategoryname].length;t++)
							 * {if(checkBoxProxy[subcategoryname][t]!=='')
							 * $rootScope.commentName[subcategoryname]=$rootScope.commentName[subcategoryname]+"\n"+checkBoxProxy[subcategoryname][t]; }
							 */

							console
									.dir($rootScope.commentName[subcategoryname]);
							console
									.dir($rootScope.commentName[subcategoryname]);
							console
									.dir($rootScope.commentName[subcategoryname]);
							console.dir(commentsName);
							subcategoryinfo = subcategoryname;
							$scope.$apply();

						} else {

							console.dir("hi1");
							console.dir(checkBoxProxy[subcategoryname]);
							console.dir("hi1");
							for (var j = 0; j < $rootScope.listOfCheckedQuestions.length; j++) {
								if ($rootScope.listOfCheckedQuestions[j].QuestionId === questionId) {
									//$rootScope.listOfCheckedQuestions[j] = '';
									$rootScope.listOfCheckedQuestions.splice(j,1);
									console.dir("removed unchecked question id"+$rootScope.listOfCheckedQuestions);
									console.dir($rootScope.listOfCheckedQuestions);
									break;
								}

							}
							/*for (var j = 0; j < $rootScope.listOfCheckedQuestions.length; j++) {
								if ($rootScope.listOfCheckedQuestions[j].QuestionId === questionId) {
									$rootScope.listOfCheckedQuestions[j] = '';
								}

							}*/

							/*
							 * for (var j = 0; j <
							 * checkBoxProxy[subcategoryname].length; j++) { if
							 * (checkBoxProxy[subcategoryname][j] ===
							 * checkboxName) {
							 * checkBoxProxy[subcategoryname][j]='';
							 * 
							 * $rootScope.commentName[subcategoryname]='';
							 * 
							 * for(var t=0;t<checkBoxProxy[subcategoryname].length;t++) {
							 * if(checkBoxProxy[subcategoryname][t]!=='')
							 * $rootScope.commentName[subcategoryname]=$rootScope.commentName[subcategoryname]+"\n"+checkBoxProxy[subcategoryname][t]; }
							 * 
							 * checkboxChecked=checkboxChecked.slice(0,j)+checkboxChecked.slice(j+1,checkboxChecked.length+1);
							 * console.log(checkboxChecked); console
							 * .log("checkbox checked values present"); var
							 * index = $rootScope.commentName[subcategoryname]
							 * .indexOf(checkboxName);
							 * 
							 * $rootScope.commentName[subcategoryname] =
							 * $rootScope.commentName[subcategoryname] .slice(0,
							 * index) + $rootScope.commentName[subcategoryname]
							 * .slice(index+checkboxName.length);
							 * 
							 * $rootScope.commentName[subcategoryname]=$rootScope.commentName[subcategoryname]-checkboxName;
							 * console.dir($rootScope.commentName);
							 * subcategoryinfo=subcategoryname; $scope.$apply();
							 *  } }
							 */

						}
						/*
						 * for(var k=0; k<checkboxChecked.length; k++)){
						 * console.log(checkboxChecked[k]); }
						 */
						console.log(checkboxName);
						console.dir(isChecked);

					};
					/*$scope.validateforminterests = function() {
						
						 * $rootScope.listOfCheckedQuestionsSubcategory=[];
						 * for(var i=0;i<$rootScope.listOfCheckedQuestions.length;i++) {
						 * console.dir("inside validate
						 * form"+$rootScope.listOfCheckedQuestions[i].Subcategory+"");
						 * for(var k=0;k<$rootScope.listOfCheckedQuestionsSubcategory.length;k++){
						 * if($rootScope.listOfCheckedQuestionsSubcategory[k]===$rootScope.listOfCheckedQuestions[i].Subcategory) {
						 *  } else{
						 * $rootScope.listOfCheckedQuestionsSubcategory.push($rootScope.listOfCheckedQuestions[i].Subcategory); } }
						 * console.dir($rootScope.listOfCheckedQuestionsSubcategory); }
						 
						for (var i = 0; i < $rootScope.listOfCheckedQuestions.length; i++) {
							console
									.dir("inside validate form"
											+ $rootScope.listOfCheckedQuestions[i].Subcategory
											+ "");

							if ($rootScope.SelectedMaturityLevel[$rootScope.listOfCheckedQuestions[i].Subcategory].length == 0) {
								$rootScope.$on('$stateChangeStart', function(
										event, toState, toParams, fromState,
										fromParams) {
									if (toState.name != 'form.payment')
										event.preventDefault();

								});
							} else {
								$state.go('form.payment');
							}
						}

					};*/

				});

app
		.controller(
				'formthirdController',
				function($rootScope, $scope, $http) {

					$scope.Culture = {};
					$http.get('http://localhost:8087/assessmentByName/Culture')
							.then(function(response) {
								$scope.Culture = response.data;

							});
					$rootScope.AddSelectedMaturityLevel = function(subcategory,
							SelectedOption, subcategoryId) {
						var object = {
							name : '',
							subcategoryId : '',
							maturityLevel : ''
						};
						$rootScope.SelectedMaturityLevel[subcategory] = [];
						object.name = subcategory;
						object.subcategoryId = subcategoryId;
						object.maturityLevel = SelectedOption;
						if (SelectedOption === undefined) {
						} else {
							$rootScope.SelectedMaturityLevel[subcategory]
									.push(object);

							if ($rootScope.subCategoryArray.length === 0) {
								$rootScope.subCategoryArray.push(subcategory);
							}
							var i=0;
							var checkSubCategoryArrayPush=false;
							while(i< $rootScope.subCategoryArray.length)
								{
								if ($rootScope.subCategoryArray[i]===subcategory) {
									checkSubCategoryArrayPush=true;
									break;
								}
								i++;
								}
							if(!checkSubCategoryArrayPush)
								{
								$rootScope.subCategoryArray
								.push(subcategory);
								}
							/*for (var i = 0; i < $rootScope.subCategoryArray.length; i++) {
								if ($rootScope.subCategoryArray[i] === subcategory) {
								} else {
									$rootScope.subCategoryArray
											.push(subcategory);
									break;
								}

							}*/
						}

						console
								.dir($rootScope.SelectedMaturityLevel[subcategory]);

					};

					var questionObject = {
						name : '',
						id : '',
						score : ''
					};
					$scope.count = 1;
					$scope.oneAtATime = true;
					$scope.Arr = [];

					$scope.names = [ "Regression", "Repeatable", "Consistent",
							"Quantitatively Measured", "Optimizing" ];

					$scope.collapseAll = function(data) {
						for ( var i in $scope.accordianData) {
							if ($scope.accordianData[i] != data) {
								$scope.accordianData[i].expanded = false;
							}
						}
						data.expanded = !data.expanded;
					};

					// we will store all of our form data in this object
					$scope.formData = {};
					$scope.rootArea = {};
					$scope.category = {};

					var obj = {
						name : '',
						url : ''
					};
					var subObj = {
						name : ''
					};

					$scope.arr = [];
					$scope.cat = [];
					$scope.subCategory = [];
					$scope.questions = [];
					var uri = [ {
						"url" : ".profile"
					}, {
						"url" : ".interests"
					}, {
						"url" : ".payment"
					}, {
						"url" : ".microservices"
					} ];

					$http
							.get('http://localhost:8087/assessment/0')
							.then(
									function(response) {
										$scope.rootArea = response.data;

										for (var i = 0; i < $scope.rootArea.length; i++) {
											obj = {
												name : '',
												url : ''
											};
											obj.name = $scope.rootArea[i].name;
											obj.url = uri[i].url;
											$scope.arr.push(obj);

										}

									});
					// $scope.kl = $scope.selectedName
					// console.dir(params.selectedName);

					$scope.subCategoryinfo = {};

					$scope.myFunc = function(selectedName, subcategoryname,
							categoryname) {
						// $rootScope.commentName[subcategoryname]='';
						$scope.Arr = {'Dev Quality' : {},
								'Unit Testing' : {},
								'Build' : {},
								'Deploy' : {},
								'NFR (Non Func Req) Testing' : {},
								'Automated Testing' : {},
								'Project Release Strategy' : {},
								'Testing Gates' : {},
								'DB Versioning & Change Management' : {},
								'Performance Regression Test' : {},
								'Functional Regression Test' : {},
								'Package and Deploy' : {},
								'Checkout, Build and Unit test' : {},
								'Infrastructure Monitoring' : {},
								'Logging Insights' : {},
								'End User Monitoring' : {},
								'Application Performance Monitoring' : {},
								'Infrastructure Code and Configuration' : {},
								'Automated Provisioning' : {},
								'Immutable Infrastructure' : {},
								'Project Collaboration & Community' : {},
								'Service Desk' : {},
								'Overall Release Management' : {},
								'Application Release Strategy' : {},
								'Data Release Strategy' : {},
								'Team Collaboration' : {},
								'Deployment Frequency (test/stage/prod)' : {},
								'Change Lead Time' : {},
								'Change Failure Rate ' : {},
								'Mean Time To Recover (MTTR)' : {},
								'Design Principles' : {},
								'Database Independence' : {},
								'Integration' : {},
								'Independent Build Infrastructure' : {},
								'Independent Deployments' : {},
								'Versioning' : {},
								'Immutable Infrastructure' : {}
								};
						$scope.regressive = [];
						$scope.repeatable = [];
						$scope.consistent = [];
						$scope.QUANTITATIVELY_MEASURED = [];
						$scope.OPTIMIZING = [];
						var subCategoryinfo = subcategoryname;
						if (subcategoryname === 'Deployment Frequency (test/stage/prod)') {
							subcategoryname = 'Deployment Frequency (test%2Fstage%2Fprod)';
						}

						$http
								.get(
										'http://localhost:8087/Culture/'
												+ categoryname + '/'
												+ subcategoryname+'/'+$rootScope.projectidTest)
								.then(
										function(response) {
											$scope.ContinuousIntegrationQuestions = response.data;

											for (var i = 0; i < $scope.ContinuousIntegrationQuestions.length; i++) {
												console
														.dir($scope.ContinuousIntegrationQuestions[i].maturityRating);
												switch ($scope.ContinuousIntegrationQuestions[i].maturityRating) {
												case "REGRESSIVE":
													questionObject = {
														name : '',
														id : '',
														score : '',
														checked:''
													};
													questionObject.name = $scope.ContinuousIntegrationQuestions[i].name;
													questionObject.id = $scope.ContinuousIntegrationQuestions[i].questionKey.id;
													questionObject.score = -1;
													questionObject.checked=$scope.ContinuousIntegrationQuestions[i].checked;
													if(!(questionObject.checked))
													{
													for(var j=0;j<$rootScope.listOfCheckedQuestions.length;j++)
														{
														if($rootScope.listOfCheckedQuestions[j].Subcategory==subcategoryname){
															if($rootScope.listOfCheckedQuestions[j].QuestionId==questionObject.id)
																{
																questionObject.checked=true;
																}
														}
														}
													}
													$scope.regressive
															.push(questionObject);
													// console.log(questionObject);
													break;

												case "REPEATABLE":
													questionObject = {
														name : '',
														id : '',
														score : '',
														checked:''
													};
													questionObject.name = $scope.ContinuousIntegrationQuestions[i].name;
													questionObject.id = $scope.ContinuousIntegrationQuestions[i].questionKey.id;
													questionObject.score = 0;
													questionObject.checked=$scope.ContinuousIntegrationQuestions[i].checked;
													$scope.repeatable
															.push(questionObject);
													break;

												case "CONSISTENT":
													questionObject = {
														name : '',
														id : '',
														score : '',
														checked:''
													};
													questionObject.name = $scope.ContinuousIntegrationQuestions[i].name;
													questionObject.id = $scope.ContinuousIntegrationQuestions[i].questionKey.id;
													questionObject.score = 1;
													questionObject.checked=$scope.ContinuousIntegrationQuestions[i].checked;
													if(!(questionObject.checked))
													{
													for(var j=0;j<$rootScope.listOfCheckedQuestions.length;j++)
														{
														if($rootScope.listOfCheckedQuestions[j].Subcategory==subcategoryname){
															if($rootScope.listOfCheckedQuestions[j].QuestionId==questionObject.id)
																{
																questionObject.checked=true;
																}
														}
														}
													}
													$scope.consistent
															.push(questionObject);
													break;

												case "QUANTITATIVELY_MEASURED":
													questionObject = {
														name : '',
														id : '',
														score : '',
														checked:''
													};
													questionObject.name = $scope.ContinuousIntegrationQuestions[i].name;
													questionObject.id = $scope.ContinuousIntegrationQuestions[i].questionKey.id;
													questionObject.score = 2;
													questionObject.checked=$scope.ContinuousIntegrationQuestions[i].checked;
													if(!(questionObject.checked))
													{
													for(var j=0;j<$rootScope.listOfCheckedQuestions.length;j++)
														{
														if($rootScope.listOfCheckedQuestions[j].Subcategory==subcategoryname){
															if($rootScope.listOfCheckedQuestions[j].QuestionId==questionObject.id)
																{
																questionObject.checked=true;
																}
														}
														}
													}
													$scope.QUANTITATIVELY_MEASURED
															.push(questionObject);
													break;

												case "OPTIMIZING":
													questionObject = {
														name : '',
														id : '',
														score : '',
														checked:''
													};
													questionObject.name = $scope.ContinuousIntegrationQuestions[i].name;
													questionObject.id = $scope.ContinuousIntegrationQuestions[i].questionKey.id;
													questionObject.score = 3;
													questionObject.checked=$scope.ContinuousIntegrationQuestions[i].checked;
													if(!(questionObject.checked))
													{
													for(var j=0;j<$rootScope.listOfCheckedQuestions.length;j++)
														{
														if($rootScope.listOfCheckedQuestions[j].Subcategory==subcategoryname){
															if($rootScope.listOfCheckedQuestions[j].QuestionId==questionObject.id)
																{
																questionObject.checked=true;
																}
														}
														}
													}
													$scope.OPTIMIZING
															.push(questionObject);
													break;

												}
												console
														.dir($scope.regressive.length);

											}
										});

						switch (subcategoryname) {

						case 'Change Failure Rate ':
							switch (selectedName) {
							case 'Regression':

								$scope.Arr[subcategoryname][selectedName] = $scope.regressive;
								console.dir($scope.Arr);
								break;

							case 'Repeatable':
								$scope.Arr[subcategoryname][selectedName] = $scope.repeatable;
								console.dir($scope.Arr);
								break;

							case 'Consistent':
								$scope.Arr[subcategoryname][selectedName] = $scope.consistent;
								console.dir($scope.Arr);
								break;

							case 'Optimizing':
								$scope.Arr[subcategoryname][selectedName] = $scope.OPTIMIZING;
								console.dir($scope.Arr);
								break;

							case 'Quantitatively Measured':
								$scope.Arr[subcategoryname][selectedName] = $scope.QUANTITATIVELY_MEASURED;
								console.dir($scope.Arr);
								break;

							}

							break;

						case 'Team Collaboration':

							switch (selectedName) {
							case 'Regression':

								$scope.Arr[subcategoryname][selectedName] = $scope.regressive;
								console.dir($scope.Arr);
								break;

							case 'Repeatable':
								$scope.Arr[subcategoryname][selectedName] = $scope.repeatable;
								console.dir($scope.Arr);
								break;

							case 'Consistent':
								$scope.Arr[subcategoryname][selectedName] = $scope.consistent;
								console.dir($scope.Arr);
								break;

							case 'Optimizing':
								$scope.Arr[subcategoryname][selectedName] = $scope.OPTIMIZING;
								console.dir($scope.Arr);
								break;

							case 'Quantitatively Measured':
								$scope.Arr[subcategoryname][selectedName] = $scope.QUANTITATIVELY_MEASURED;
								console.dir($scope.Arr);
								break;

							}

							break;

						case 'Deployment Frequency (test%2Fstage%2Fprod)':
							subcategoryname=subCategoryinfo;
							switch (selectedName) {
							
							case 'Regression':

								$scope.Arr[subcategoryname][selectedName] = $scope.regressive;
								console.dir($scope.Arr);
								break;

							case 'Repeatable':
								$scope.Arr[subcategoryname][selectedName] = $scope.repeatable;
								console.dir($scope.Arr);
								break;

							case 'Consistent':
								$scope.Arr[subcategoryname][selectedName] = $scope.consistent;
								console.dir($scope.Arr);
								break;

							case 'Optimizing':
								$scope.Arr[subcategoryname][selectedName] = $scope.OPTIMIZING;
								console.dir($scope.Arr);
								break;

							case 'Quantitatively Measured':
								$scope.Arr[subcategoryname][selectedName] = $scope.QUANTITATIVELY_MEASURED;
								console.dir($scope.Arr);
								break;

							}

							break;

						case 'Data Release Strategy':

							switch (selectedName) {
							case 'Regression':

								$scope.Arr[subcategoryname][selectedName] = $scope.regressive;
								console.dir($scope.Arr);
								break;

							case 'Repeatable':
								$scope.Arr[subcategoryname][selectedName] = $scope.repeatable;
								console.dir($scope.Arr);
								break;

							case 'Consistent':
								$scope.Arr[subcategoryname][selectedName] = $scope.consistent;
								console.dir($scope.Arr);
								break;

							case 'Optimizing':
								$scope.Arr[subcategoryname][selectedName] = $scope.OPTIMIZING;
								console.dir($scope.Arr);
								break;

							case 'Quantitatively Measured':
								$scope.Arr[subcategoryname][selectedName] = $scope.QUANTITATIVELY_MEASURED;
								console.dir($scope.Arr);
								break;

							}

							break;

						case 'Application Release Strategy':

							switch (selectedName) {
							case 'Regression':

								$scope.Arr[subcategoryname][selectedName] = $scope.regressive;
								console.dir($scope.Arr);
								break;

							case 'Repeatable':
								$scope.Arr[subcategoryname][selectedName] = $scope.repeatable;
								console.dir($scope.Arr);
								break;

							case 'Consistent':
								$scope.Arr[subcategoryname][selectedName] = $scope.consistent;
								console.dir($scope.Arr);
								break;

							case 'Optimizing':
								$scope.Arr[subcategoryname][selectedName] = $scope.OPTIMIZING;
								console.dir($scope.Arr);
								break;

							case 'Quantitatively Measured':
								$scope.Arr[subcategoryname][selectedName] = $scope.QUANTITATIVELY_MEASURED;
								console.dir($scope.Arr);
								break;

							}

							break;

						case 'Overall Release Management':
							switch (selectedName) {
							case 'Regression':

								$scope.Arr[subcategoryname][selectedName] = $scope.regressive;
								console.dir($scope.Arr);
								break;

							case 'Repeatable':
								$scope.Arr[subcategoryname][selectedName] = $scope.repeatable;
								console.dir($scope.Arr);
								break;

							case 'Consistent':
								$scope.Arr[subcategoryname][selectedName] = $scope.consistent;
								console.dir($scope.Arr);
								break;

							case 'Optimizing':
								$scope.Arr[subcategoryname][selectedName] = $scope.OPTIMIZING;
								console.dir($scope.Arr);
								break;

							case 'Quantitatively Measured':
								$scope.Arr[subcategoryname][selectedName] = $scope.QUANTITATIVELY_MEASURED;
								console.dir($scope.Arr);
								break;

							}

							break;

						case 'Service Desk':
							switch (selectedName) {
							case 'Regression':

								$scope.Arr[subcategoryname][selectedName] = $scope.regressive;
								console.dir($scope.Arr);
								break;

							case 'Repeatable':
								$scope.Arr[subcategoryname][selectedName] = $scope.repeatable;
								console.dir($scope.Arr);
								break;

							case 'Consistent':
								$scope.Arr[subcategoryname][selectedName] = $scope.consistent;
								console.dir($scope.Arr);
								break;

							case 'Optimizing':
								$scope.Arr[subcategoryname][selectedName] = $scope.OPTIMIZING;
								console.dir($scope.Arr);
								break;

							case 'Quantitatively Measured':
								$scope.Arr[subcategoryname][selectedName] = $scope.QUANTITATIVELY_MEASURED;
								console.dir($scope.Arr);
								break;

							}

							break;

						case 'Project Collaboration & Community':
							switch (selectedName) {
							case 'Regression':

								$scope.Arr[subcategoryname][selectedName] = $scope.regressive;
								console.dir($scope.Arr);
								break;

							case 'Repeatable':
								$scope.Arr[subcategoryname][selectedName] = $scope.repeatable;
								console.dir($scope.Arr);
								break;

							case 'Consistent':
								$scope.Arr[subcategoryname][selectedName] = $scope.consistent;
								console.dir($scope.Arr);
								break;

							case 'Optimizing':
								$scope.Arr[subcategoryname][selectedName] = $scope.OPTIMIZING;
								console.dir($scope.Arr);
								break;

							case 'Quantitatively Measured':
								$scope.Arr[subcategoryname][selectedName] = $scope.QUANTITATIVELY_MEASURED;
								console.dir($scope.Arr);
								break;

							}

							break;

						case 'Mean Time To Recover (MTTR)':
							switch (selectedName) {
							case 'Regression':

								$scope.Arr[subcategoryname][selectedName] = $scope.regressive;
								console.dir($scope.Arr);
								break;

							case 'Repeatable':
								$scope.Arr[subcategoryname][selectedName] = $scope.repeatable;
								console.dir($scope.Arr);
								break;

							case 'Consistent':
								$scope.Arr[subcategoryname][selectedName] = $scope.consistent;
								console.dir($scope.Arr);
								break;

							case 'Optimizing':
								$scope.Arr[subcategoryname][selectedName] = $scope.OPTIMIZING;
								console.dir($scope.Arr);
								break;

							case 'Quantitatively Measured':
								$scope.Arr[subcategoryname][selectedName] = $scope.QUANTITATIVELY_MEASURED;
								console.dir($scope.Arr);
								break;

							}

							break;

						case 'Change Lead Time':
							switch (selectedName) {
							case 'Regression':

								$scope.Arr[subcategoryname][selectedName] = $scope.regressive;
								console.dir($scope.Arr);
								break;

							case 'Repeatable':
								$scope.Arr[subcategoryname][selectedName] = $scope.repeatable;
								console.dir($scope.Arr);
								break;

							case 'Consistent':
								$scope.Arr[subcategoryname][selectedName] = $scope.consistent;
								console.dir($scope.Arr);
								break;

							case 'Optimizing':
								$scope.Arr[subcategoryname][selectedName] = $scope.OPTIMIZING;
								console.dir($scope.Arr);
								break;

							case 'Quantitatively Measured':
								$scope.Arr[subcategoryname][selectedName] = $scope.QUANTITATIVELY_MEASURED;
								console.dir($scope.Arr);
								break;

							}

							break;

						}

					};
					$scope.score = [];
					var total = 0;

					var checkboxChecked = [];
					var count = 0;
					var checkboxChecked = [];
					var proxyarr = {
						'Project Collaboration & Community' : [],
						'Service Desk' : [],
						'Overall Release Management' : [],
						'Application Release Strategy' : [],
						'Data Release Strategy' : [],
						'Team Collaboration' : [],
						'Deployment Frequency (test/stage/prod)' : [],
						'Change Lead Time' : [],
						'Change Failure Rate' : [],
						'Mean Time To Recover (MTTR)' : []

					};
					var proxyarr1 = [];
					var checkBoxProxy = [];
					var subcategoryinfo = 'Dev Quality';

					$scope.myscore = function(checkboxName, isChecked,
							commentsName, subcategoryname, questionId) {
						console.dir("sdhbfsdhbf");
						console.dir(questionId);
						console.dir("jjj");
						console.log("hello"
								+ $scope.commentName[subcategoryname]);
						console.log("hello" + $scope.commentName);
						/*
						 * if(subcategoryinfo!=subcategoryname) { proxyarr=[]; }
						 */
						checkBoxProxy[subcategoryname] = proxyarr[subcategoryname];

						var object = {
							Subcategory : '',
							QuestionId : ''
						};

						if (isChecked) {
							object.Subcategory = subcategoryname;
							object.QuestionId = questionId;
							//$rootScope.listOfCheckedQuestions.push(object);
							if($rootScope.listOfCheckedQuestions.length==0){
								$rootScope.listOfCheckedQuestions.push(object);
							}
							else{
							var i=0;
							var checkIfQuestionIdAlreadyPushed=true;
							while(i<$rootScope.listOfCheckedQuestions.length){
								if($rootScope.listOfCheckedQuestions[i].QuestionId==object.QuestionId)
									{
									checkIfQuestionIdAlreadyPushed=false;
									break;
									}
									
									
								i++;
							}
							
							if(checkIfQuestionIdAlreadyPushed){
								$rootScope.listOfCheckedQuestions.push(object);
								}
							}
							/*
							 * $rootScope.saveObject ={ ClientId : '', projectId :
							 * '', listOfQuestions : [], subCategory{
							 * maturityLevel:'', CommentBox:'',
							 * subcategoryId:''} };
							 * 
							 * 
							 * 
							 * 
							 * 
							 * 
							 * 
							 * $rootScope.saveObject.ClientId=$rootScope.projectDetails.Client_id.id;
							 * $rootScope.saveObject.listOfQuestions=$rootScope.listOfCheckedQuestions;
							 * $rootScope.saveObject.projectId=$rootScope.projectDetails.projects.project_id.id;
							 */

							//questionIdsChecked[subcategoryname]
							checkboxChecked[count] = checkboxName;
							checkBoxProxy[subcategoryname].push(checkboxName);
							console.dir("Hi");
							console.dir(checkBoxProxy[subcategoryname]);
							console.dir("Hi");
							console.dir(checkboxChecked.length);
							count++;
							if (Window.commentsName === undefined) {
								commentsName = "";
							}
							if ($rootScope.commentName[subcategoryname] == null) {
								// do something with foo
								$rootScope.commentName[subcategoryname] = "";
							}

							/*
							 * $rootScope.commentName[subcategoryname] =
							 * commentsName +
							 * $rootScope.commentName[subcategoryname] + "\n" ;
							 * 
							 * $rootScope.commentName[subcategoryname]='';
							 * proxyarr1=checkBoxProxy[subcategoryname]; for(var
							 * t=0;t<checkBoxProxy[subcategoryname].length;t++)
							 * {if(checkBoxProxy[subcategoryname][t]!=='')
							 * $rootScope.commentName[subcategoryname]=$rootScope.commentName[subcategoryname]+"\n"+checkBoxProxy[subcategoryname][t]; }
							 */

							console
									.dir($rootScope.commentName[subcategoryname]);
							console
									.dir($rootScope.commentName[subcategoryname]);
							console
									.dir($rootScope.commentName[subcategoryname]);
							console.dir(commentsName);
							subcategoryinfo = subcategoryname;
							$scope.$apply();

						} else {

							console.dir("hi1");
							console.dir(checkBoxProxy[subcategoryname]);
							console.dir("hi1");
							for (var j = 0; j < $rootScope.listOfCheckedQuestions.length; j++) {
								if ($rootScope.listOfCheckedQuestions[j].QuestionId === questionId) {
									//$rootScope.listOfCheckedQuestions[j] = '';
									$rootScope.listOfCheckedQuestions.splice(j,1);
									console.dir("removed unchecked question id"+$rootScope.listOfCheckedQuestions);
									console.dir($rootScope.listOfCheckedQuestions);
									break;
								}

							}
							/*for (var j = 0; j < $rootScope.listOfCheckedQuestions.length; j++) {
								if ($rootScope.listOfCheckedQuestions[j].QuestionId === questionId) {
									$rootScope.listOfCheckedQuestions[j] = '';
								}

							}*/

							/*
							 * for (var j = 0; j <
							 * checkBoxProxy[subcategoryname].length; j++) { if
							 * (checkBoxProxy[subcategoryname][j] ===
							 * checkboxName) {
							 * checkBoxProxy[subcategoryname][j]='';
							 * 
							 * $rootScope.commentName[subcategoryname]='';
							 * 
							 * for(var t=0;t<checkBoxProxy[subcategoryname].length;t++) {
							 * if(checkBoxProxy[subcategoryname][t]!=='')
							 * $rootScope.commentName[subcategoryname]=$rootScope.commentName[subcategoryname]+"\n"+checkBoxProxy[subcategoryname][t]; }
							 * 
							 * checkboxChecked=checkboxChecked.slice(0,j)+checkboxChecked.slice(j+1,checkboxChecked.length+1);
							 * console.log(checkboxChecked); console
							 * .log("checkbox checked values present"); var
							 * index = $rootScope.commentName[subcategoryname]
							 * .indexOf(checkboxName);
							 * 
							 * $rootScope.commentName[subcategoryname] =
							 * $rootScope.commentName[subcategoryname] .slice(0,
							 * index) + $rootScope.commentName[subcategoryname]
							 * .slice(index+checkboxName.length);
							 * 
							 * $rootScope.commentName[subcategoryname]=$rootScope.commentName[subcategoryname]-checkboxName;
							 * console.dir($rootScope.commentName);
							 * subcategoryinfo=subcategoryname; $scope.$apply();
							 *  } }
							 */

						}
						/*
						 * for(var k=0; k<checkboxChecked.length; k++)){
						 * console.log(checkboxChecked[k]); }
						 */
						console.log(checkboxName);
						console.dir(isChecked);

					};

				});

app
		.controller(
				'formfourthController',
				function($rootScope, $scope, $http) {

					$scope.Microservices = {};
					$http
							.get(
									'http://localhost:8087/assessmentByName/Micro Services')
							.then(function(response) {
								$scope.Microservices = response.data;

							});
					$rootScope.AddSelectedMaturityLevel = function(subcategory,
							SelectedOption, subcategoryId) {
						var object = {
							name : '',
							subcategoryId : '',
							maturityLevel : ''
						};
						$rootScope.SelectedMaturityLevel[subcategory] = [];
						object.name = subcategory;
						object.subcategoryId = subcategoryId;
						object.maturityLevel = SelectedOption;
						if (SelectedOption === undefined) {
						} else {
							$rootScope.SelectedMaturityLevel[subcategory]
									.push(object);

							if ($rootScope.subCategoryArray.length === 0) {
								$rootScope.subCategoryArray.push(subcategory);
							}
							var i=0;
							var checkSubCategoryArrayPush=false;
							while(i< $rootScope.subCategoryArray.length)
								{
								if ($rootScope.subCategoryArray[i]===subcategory) {
									checkSubCategoryArrayPush=true;
									break;
								}
								i++;
								}
							if(!checkSubCategoryArrayPush)
								{
								$rootScope.subCategoryArray
								.push(subcategory);
								}
							/*for (var i = 0; i < $rootScope.subCategoryArray.length; i++) {
								if ($rootScope.subCategoryArray[i] === subcategory) {
								} else {
									$rootScope.subCategoryArray
											.push(subcategory);
									break;
								}

							}*/
						}

						console
								.dir($rootScope.SelectedMaturityLevel[subcategory]);

					};

					$scope.gotoId = function(id) {
						$location.hash(id);

						// call $anchorScroll()
						$anchorScroll();
					};

					var questionObject = {
						name : '',
						id : '',
						score : ''
					};
					$scope.count = 1;
					$scope.oneAtATime = true;
					$scope.Arr = [];

					$scope.names = [ "Regression", "Repeatable", "Consistent",
							"Quantitatively Measured", "Optimizing" ];

					$scope.collapseAll = function(data) {
						for ( var i in $scope.accordianData) {
							if ($scope.accordianData[i] != data) {
								$scope.accordianData[i].expanded = false;
							}
						}
						data.expanded = !data.expanded;
					};

					// we will store all of our form data in this object
					$scope.formData = {};
					$scope.rootArea = {};
					$scope.category = {};

					var obj = {
						name : '',
						url : ''
					};
					var subObj = {
						name : ''
					};

					$scope.arr = [];
					$scope.cat = [];
					$scope.subCategory = [];
					$scope.questions = [];
					var uri = [ {
						"url" : ".profile"
					}, {
						"url" : ".interests"
					}, {
						"url" : ".payment"
					}, {
						"url" : ".microservices"
					} ];

					$http
							.get('http://localhost:8087/assessment/0')
							.then(
									function(response) {
										$scope.rootArea = response.data;

										for (var i = 0; i < $scope.rootArea.length; i++) {
											obj = {
												name : '',
												url : ''
											};
											obj.name = $scope.rootArea[i].name;
											obj.url = uri[i].url;
											$scope.arr.push(obj);

										}

									});
					// $scope.kl = $scope.selectedName
					// console.dir(params.selectedName);

					$scope.subCategoryinfo = {};

					$scope.myFunc = function(selectedName, subcategoryname,
							categoryname) {
						// $rootScope.commentName[subcategoryname]='';
						$scope.Arr = {'Dev Quality' : {},
								'Unit Testing' : {},
								'Build' : {},
								'Deploy' : {},
								'NFR (Non Func Req) Testing' : {},
								'Automated Testing' : {},
								'Project Release Strategy' : {},
								'Testing Gates' : {},
								'DB Versioning & Change Management' : {},
								'Performance Regression Test' : {},
								'Functional Regression Test' : {},
								'Package and Deploy' : {},
								'Checkout, Build and Unit test' : {},
								'Infrastructure Monitoring' : {},
								'Logging Insights' : {},
								'End User Monitoring' : {},
								'Application Performance Monitoring' : {},
								'Infrastructure Code and Configuration' : {},
								'Automated Provisioning' : {},
								'Immutable Infrastructure' : {},
								'Project Collaboration & Community' : {},
								'Service Desk' : {},
								'Overall Release Management' : {},
								'Application Release Strategy' : {},
								'Data Release Strategy' : {},
								'Team Collaboration' : {},
								'Deployment Frequency (test/stage/prod)' : {},
								'Change Lead Time' : {},
								'Change Failure Rate' : {},
								'Mean Time To Recover (MTTR)' : {},
								'Design Principles' : {},
								'Database Independence' : {},
								'Integration' : {},
								'Independent Build Infrastructure' : {},
								'Independent Deployments' : {},
								'Versioning' : {},
								'Immutable Infrastructure' : {},
								'Fault and Resource isolation' : {}
						};
						$scope.regressive = [];
						$scope.repeatable = [];
						$scope.consistent = [];
						$scope.QUANTITATIVELY_MEASURED = [];
						$scope.OPTIMIZING = [];
						$scope.subCategoryinfo = subcategoryname;
						if (categoryname === 'Project / Release Management') {
							categoryname = 'Project Release Management';
						}

						$http
								.get(
										'http://localhost:8087/Micro Services/'
												+ categoryname + '/'
												+ subcategoryname+'/'+$rootScope.projectidTest)
								.then(
										function(response) {
											$scope.ContinuousIntegrationQuestions = response.data;

											for (var i = 0; i < $scope.ContinuousIntegrationQuestions.length; i++) {
												console
														.dir($scope.ContinuousIntegrationQuestions[i].maturityRating);
												switch ($scope.ContinuousIntegrationQuestions[i].maturityRating) {
												case "REGRESSIVE":
													questionObject = {
														name : '',
														id : '',
														score : '',
														checked:''
													};
													questionObject.name = $scope.ContinuousIntegrationQuestions[i].name;
													questionObject.id = $scope.ContinuousIntegrationQuestions[i].questionKey.id;
													questionObject.score = -1;
													questionObject.checked=$scope.ContinuousIntegrationQuestions[i].checked;
													if(!(questionObject.checked))
													{
													for(var j=0;j<$rootScope.listOfCheckedQuestions.length;j++)
														{
														if($rootScope.listOfCheckedQuestions[j].Subcategory==subcategoryname){
															if($rootScope.listOfCheckedQuestions[j].QuestionId==questionObject.id)
																{
																questionObject.checked=true;
																}
														}
														}
													}
													$scope.regressive
															.push(questionObject);
													// console.log(questionObject);
													break;

												case "REPEATABLE":
													questionObject = {
														name : '',
														id : '',
														score : '',
														checked:''
													};
													questionObject.name = $scope.ContinuousIntegrationQuestions[i].name;
													questionObject.id = $scope.ContinuousIntegrationQuestions[i].questionKey.id;
													questionObject.score = 0;
													questionObject.checked=$scope.ContinuousIntegrationQuestions[i].checked;
													if(!(questionObject.checked))
													{
													for(var j=0;j<$rootScope.listOfCheckedQuestions.length;j++)
														{
														if($rootScope.listOfCheckedQuestions[j].Subcategory==subcategoryname){
															if($rootScope.listOfCheckedQuestions[j].QuestionId==questionObject.id)
																{
																questionObject.checked=true;
																}
														}
														}
													}
													$scope.repeatable
															.push(questionObject);
													break;

												case "CONSISTENT":
													questionObject = {
														name : '',
														id : '',
														score : '',
														checked:''
													};
													questionObject.name = $scope.ContinuousIntegrationQuestions[i].name;
													questionObject.id = $scope.ContinuousIntegrationQuestions[i].questionKey.id;
													questionObject.score = 1;
													questionObject.checked=$scope.ContinuousIntegrationQuestions[i].checked;
													if(!(questionObject.checked))
													{
													for(var j=0;j<$rootScope.listOfCheckedQuestions.length;j++)
														{
														if($rootScope.listOfCheckedQuestions[j].Subcategory==subcategoryname){
															if($rootScope.listOfCheckedQuestions[j].QuestionId==questionObject.id)
																{
																questionObject.checked=true;
																}
														}
														}
													}
													$scope.consistent
															.push(questionObject);
													break;

												case "QUANTITATIVELY_MEASURED":
													questionObject = {
														name : '',
														id : '',
														score : '',
														checked:''
													};
													questionObject.name = $scope.ContinuousIntegrationQuestions[i].name;
													questionObject.id = $scope.ContinuousIntegrationQuestions[i].questionKey.id;
													questionObject.score = 2;
													questionObject.checked=$scope.ContinuousIntegrationQuestions[i].checked;
													if(!(questionObject.checked))
													{
													for(var j=0;j<$rootScope.listOfCheckedQuestions.length;j++)
														{
														if($rootScope.listOfCheckedQuestions[j].Subcategory==subcategoryname){
															if($rootScope.listOfCheckedQuestions[j].QuestionId==questionObject.id)
																{
																questionObject.checked=true;
																}
														}
														}
													}
													$scope.QUANTITATIVELY_MEASURED
															.push(questionObject);
													break;

												case "OPTIMIZING":
													questionObject = {
														name : '',
														id : '',
														score : '',
														checked:''
													};
													questionObject.name = $scope.ContinuousIntegrationQuestions[i].name;
													questionObject.id = $scope.ContinuousIntegrationQuestions[i].questionKey.id;
													questionObject.score = 3;
													questionObject.checked=$scope.ContinuousIntegrationQuestions[i].checked;
													if(!(questionObject.checked))
													{
													for(var j=0;j<$rootScope.listOfCheckedQuestions.length;j++)
														{
														if($rootScope.listOfCheckedQuestions[j].Subcategory==subcategoryname){
															if($rootScope.listOfCheckedQuestions[j].QuestionId==questionObject.id)
																{
																questionObject.checked=true;
																}
														}
														}
													}
													$scope.OPTIMIZING
															.push(questionObject);
													break;

												}
												console
														.dir($scope.regressive.length);

											}
										});

						switch (subcategoryname) {
						
						
						case 'Fault and Resource isolation':
							switch (selectedName) {
							case 'Regression':

								$scope.Arr[subcategoryname][selectedName] = $scope.regressive;
								console.dir($scope.Arr);
								break;

							case 'Repeatable':
								$scope.Arr[subcategoryname][selectedName] = $scope.repeatable;
								console.dir($scope.Arr);
								break;

							case 'Consistent':
								$scope.Arr[subcategoryname][selectedName] = $scope.consistent;
								console.dir($scope.Arr);
								break;

							case 'Optimizing':
								$scope.Arr[subcategoryname][selectedName] = $scope.OPTIMIZING;
								console.dir($scope.Arr);
								break;

							case 'Quantitatively Measured':
								$scope.Arr[subcategoryname][selectedName] = $scope.QUANTITATIVELY_MEASURED;
								console.dir($scope.Arr);
								break;

							}

							break;
						
						

						case 'Design Principles':

							switch (selectedName) {
							case 'Regression':

								$scope.Arr[subcategoryname][selectedName] = $scope.regressive;
								console.dir($scope.Arr);
								break;

							case 'Repeatable':
								$scope.Arr[subcategoryname][selectedName] = $scope.repeatable;
								console.dir($scope.Arr);
								break;

							case 'Consistent':
								$scope.Arr[subcategoryname][selectedName] = $scope.consistent;
								console.dir($scope.Arr);
								break;

							case 'Optimizing':
								$scope.Arr[subcategoryname][selectedName] = $scope.OPTIMIZING;
								console.dir($scope.Arr);
								break;

							case 'Quantitatively Measured':
								$scope.Arr[subcategoryname][selectedName] = $scope.QUANTITATIVELY_MEASURED;
								console.dir($scope.Arr);
								break;

							}

							break;

						case 'Database Independence':

							switch (selectedName) {
							case 'Regression':

								$scope.Arr[subcategoryname][selectedName] = $scope.regressive;
								console.dir($scope.Arr);
								break;

							case 'Repeatable':
								$scope.Arr[subcategoryname][selectedName] = $scope.repeatable;
								console.dir($scope.Arr);
								break;

							case 'Consistent':
								$scope.Arr[subcategoryname][selectedName] = $scope.consistent;
								console.dir($scope.Arr);
								break;

							case 'Optimizing':
								$scope.Arr[subcategoryname][selectedName] = $scope.OPTIMIZING;
								console.dir($scope.Arr);
								break;

							case 'Quantitatively Measured':
								$scope.Arr[subcategoryname][selectedName] = $scope.QUANTITATIVELY_MEASURED;
								console.dir($scope.Arr);
								break;

							}

							break;

						case 'Integration':

							switch (selectedName) {
							case 'Regression':

								$scope.Arr[subcategoryname][selectedName] = $scope.regressive;
								console.dir($scope.Arr);
								break;

							case 'Repeatable':
								$scope.Arr[subcategoryname][selectedName] = $scope.repeatable;
								console.dir($scope.Arr);
								break;

							case 'Consistent':
								$scope.Arr[subcategoryname][selectedName] = $scope.consistent;
								console.dir($scope.Arr);
								break;

							case 'Optimizing':
								$scope.Arr[subcategoryname][selectedName] = $scope.OPTIMIZING;
								console.dir($scope.Arr);
								break;

							case 'Quantitatively Measured':
								$scope.Arr[subcategoryname][selectedName] = $scope.QUANTITATIVELY_MEASURED;
								console.dir($scope.Arr);
								break;

							}

							break;

						case 'Independent Build Infrastructure':

							switch (selectedName) {
							case 'Regression':

								$scope.Arr[subcategoryname][selectedName] = $scope.regressive;
								console.dir($scope.Arr);
								break;

							case 'Repeatable':
								$scope.Arr[subcategoryname][selectedName] = $scope.repeatable;
								console.dir($scope.Arr);
								break;

							case 'Consistent':
								$scope.Arr[subcategoryname][selectedName] = $scope.consistent;
								console.dir($scope.Arr);
								break;

							case 'Optimizing':
								$scope.Arr[subcategoryname][selectedName] = $scope.OPTIMIZING;
								console.dir($scope.Arr);
								break;

							case 'Quantitatively Measured':
								$scope.Arr[subcategoryname][selectedName] = $scope.QUANTITATIVELY_MEASURED;
								console.dir($scope.Arr);
								break;

							}

							break;

						case 'Independent Deployments':
							switch (selectedName) {
							case 'Regression':

								$scope.Arr[subcategoryname][selectedName] = $scope.regressive;
								console.dir($scope.Arr);
								break;

							case 'Repeatable':
								$scope.Arr[subcategoryname][selectedName] = $scope.repeatable;
								console.dir($scope.Arr);
								break;

							case 'Consistent':
								$scope.Arr[subcategoryname][selectedName] = $scope.consistent;
								console.dir($scope.Arr);
								break;

							case 'Optimizing':
								$scope.Arr[subcategoryname][selectedName] = $scope.OPTIMIZING;
								console.dir($scope.Arr);
								break;

							case 'Quantitatively Measured':
								$scope.Arr[subcategoryname][selectedName] = $scope.QUANTITATIVELY_MEASURED;
								console.dir($scope.Arr);
								break;

							}

							break;

						case 'Versioning':
							switch (selectedName) {
							case 'Regression':

								$scope.Arr[subcategoryname][selectedName] = $scope.regressive;
								console.dir($scope.Arr);
								break;

							case 'Repeatable':
								$scope.Arr[subcategoryname][selectedName] = $scope.repeatable;
								console.dir($scope.Arr);
								break;

							case 'Consistent':
								$scope.Arr[subcategoryname][selectedName] = $scope.consistent;
								console.dir($scope.Arr);
								break;

							case 'Optimizing':
								$scope.Arr[subcategoryname][selectedName] = $scope.OPTIMIZING;
								console.dir($scope.Arr);
								break;

							case 'Quantitatively Measured':
								$scope.Arr[subcategoryname][selectedName] = $scope.QUANTITATIVELY_MEASURED;
								console.dir($scope.Arr);
								break;

							}

							break;

						

						}

					};
					$scope.score = [];
					var total = 0;
					// $rootScope.commentName =[];
					var checkboxChecked = [];
					var count = 0;
					var checkboxChecked = [];
					var proxyarr = {
						'Design Principles' : [],
						'Database Independence' : [],
						'Integration' : [],
						'Independent Build Infrastructure' : [],
						'Independent Deployments' : [],
						'Versioning' : [],
						'Immutable Infrastructure' : []

					};
					var proxyarr1 = [];
					var checkBoxProxy = [];
					var subcategoryinfo = 'Dev Quality';

					$scope.myscore = function(checkboxName, isChecked,
							commentsName, subcategoryname, questionId) {
						console.dir("sdhbfsdhbf");
						console.dir(questionId);
						console.dir("jjj");
						console.log("hello"
								+ $scope.commentName[subcategoryname]);
						console.log("hello" + $scope.commentName);
						/*
						 * if(subcategoryinfo!=subcategoryname) { proxyarr=[]; }
						 */
						checkBoxProxy[subcategoryname] = proxyarr[subcategoryname];

						var object = {
							Subcategory : '',
							QuestionId : ''
						};

						if (isChecked) {
							object.Subcategory = subcategoryname;
							object.QuestionId = questionId;
							//$rootScope.listOfCheckedQuestions.push(object);
							if($rootScope.listOfCheckedQuestions.length==0){
								$rootScope.listOfCheckedQuestions.push(object);
							}
							else{
							var i=0;
							var checkIfQuestionIdAlreadyPushed=true;
							while(i<$rootScope.listOfCheckedQuestions.length){
								if($rootScope.listOfCheckedQuestions[i].QuestionId==object.QuestionId)
									{
									checkIfQuestionIdAlreadyPushed=false;
									break;
									}
									
									
								i++;
							}
							
							if(checkIfQuestionIdAlreadyPushed){
								$rootScope.listOfCheckedQuestions.push(object);
								}
							}
							/*
							 * $rootScope.saveObject ={ ClientId : '', projectId :
							 * '', listOfQuestions : [], subCategory{
							 * maturityLevel:'', CommentBox:'',
							 * subcategoryId:''} };
							 * 
							 * 
							 * 
							 * 
							 * 
							 * 
							 * 
							 * $rootScope.saveObject.ClientId=$rootScope.projectDetails.Client_id.id;
							 * $rootScope.saveObject.listOfQuestions=$rootScope.listOfCheckedQuestions;
							 * $rootScope.saveObject.projectId=$rootScope.projectDetails.projects.project_id.id;
							 */

							//questionIdsChecked[subcategoryname]
							checkboxChecked[count] = checkboxName;
							checkBoxProxy[subcategoryname].push(checkboxName);
							console.dir("Hi");
							console.dir(checkBoxProxy[subcategoryname]);
							console.dir("Hi");
							console.dir(checkboxChecked.length);
							count++;
							if (Window.commentsName === undefined) {
								commentsName = "";
							}
							if ($rootScope.commentName[subcategoryname] == null) {
								// do something with foo
								$rootScope.commentName[subcategoryname] = "";
							}

							/*
							 * $rootScope.commentName[subcategoryname] =
							 * commentsName +
							 * $rootScope.commentName[subcategoryname] + "\n" ;
							 * 
							 * $rootScope.commentName[subcategoryname]='';
							 * proxyarr1=checkBoxProxy[subcategoryname]; for(var
							 * t=0;t<checkBoxProxy[subcategoryname].length;t++)
							 * {if(checkBoxProxy[subcategoryname][t]!=='')
							 * $rootScope.commentName[subcategoryname]=$rootScope.commentName[subcategoryname]+"\n"+checkBoxProxy[subcategoryname][t]; }
							 */

							console
									.dir($rootScope.commentName[subcategoryname]);
							console
									.dir($rootScope.commentName[subcategoryname]);
							console
									.dir($rootScope.commentName[subcategoryname]);
							console.dir(commentsName);
							subcategoryinfo = subcategoryname;
							$scope.$apply();

						} else {

							console.dir("hi1");
							console.dir(checkBoxProxy[subcategoryname]);
							console.dir("hi1");
							for (var j = 0; j < $rootScope.listOfCheckedQuestions.length; j++) {
								if ($rootScope.listOfCheckedQuestions[j].QuestionId === questionId) {
									//$rootScope.listOfCheckedQuestions[j] = '';
									$rootScope.listOfCheckedQuestions.splice(j,1);
									console.dir("removed unchecked question id"+$rootScope.listOfCheckedQuestions);
									console.dir($rootScope.listOfCheckedQuestions);
									break;
								}

							}
							/*for (var j = 0; j < $rootScope.listOfCheckedQuestions.length; j++) {
								if ($rootScope.listOfCheckedQuestions[j].QuestionId === questionId) {
									$rootScope.listOfCheckedQuestions[j] = '';
								}

							}*/

							/*
							 * for (var j = 0; j <
							 * checkBoxProxy[subcategoryname].length; j++) { if
							 * (checkBoxProxy[subcategoryname][j] ===
							 * checkboxName) {
							 * checkBoxProxy[subcategoryname][j]='';
							 * 
							 * $rootScope.commentName[subcategoryname]='';
							 * 
							 * for(var t=0;t<checkBoxProxy[subcategoryname].length;t++) {
							 * if(checkBoxProxy[subcategoryname][t]!=='')
							 * $rootScope.commentName[subcategoryname]=$rootScope.commentName[subcategoryname]+"\n"+checkBoxProxy[subcategoryname][t]; }
							 * 
							 * checkboxChecked=checkboxChecked.slice(0,j)+checkboxChecked.slice(j+1,checkboxChecked.length+1);
							 * console.log(checkboxChecked); console
							 * .log("checkbox checked values present"); var
							 * index = $rootScope.commentName[subcategoryname]
							 * .indexOf(checkboxName);
							 * 
							 * $rootScope.commentName[subcategoryname] =
							 * $rootScope.commentName[subcategoryname] .slice(0,
							 * index) + $rootScope.commentName[subcategoryname]
							 * .slice(index+checkboxName.length);
							 * 
							 * $rootScope.commentName[subcategoryname]=$rootScope.commentName[subcategoryname]-checkboxName;
							 * console.dir($rootScope.commentName);
							 * subcategoryinfo=subcategoryname; $scope.$apply();
							 *  } }
							 */

						}
						/*
						 * for(var k=0; k<checkboxChecked.length; k++)){
						 * console.log(checkboxChecked[k]); }
						 */
						console.log(checkboxName);
						console.dir(isChecked);

					};

				});

app.controller('loginController', function($rootScope, $scope, $http, $state) {
	$scope.submitMyForm = function(fields) {
		var data = fields;
		console.log("login" + data);
		console.dir(data);
		$http.post('http://localhost:8087/login', data).then(
				function(response) {
					$rootScope.projectDetails = response.data;
					if ($rootScope.projectDetails.Client_name != null) {
						console.dir("0-------------01");
						$state.go('projectDetails');
						console.dir();
					} else {
						console.dir("01-------------01");
						$state.go('errorLoginPage');
						//
					}

				});

	};

});

/*
 * app.controller('projectDetailsController', function($rootScope,$scope,
 * $http,$state) {
 * 
 * $scope.projectNames=[]; var obj={name:'' , projectId:'' , buisnessVertical:''
 * ,clientName:'',devTeamSize:'' ,qaTeamSize:''}; for(var i=0;i<$rootScope.projectDetails.length;i++) {
 * obj={name:'' , projectId:'' , buisnessVertical:''
 * ,clientName:'',devTeamSize:'' ,qaTeamSize:''};
 * obj.name=$rootScope.projectDetails[i].projectName;
 * obj.projectId=$rootScope.projectDetails[i].project_id.id;
 * obj.clientName=$rootScope.projectDetails[i].clientName;
 * obj.buisnessVertical=$rootScope.projectDetails[i].buisnessVertical;
 * obj.devTeamSize=$rootScope.projectDetails[i].devTeamSize;
 * obj.qaTeamSize=$rootScope.projectDetails[i].qaTeamSize;
 * 
 * 
 * $scope.projectNames.push(obj); console.dir(obj); } $scope.rngESUS =
 * Math.round((Math.random() * 10) * 10); console.dir($scope.rngESUS);
 * 
 * $scope.projectDetailsFunction=function(selectedName){
 * console.dir(selectedName); $rootScope.selectedProjectDetails={};
 * 
 * $rootScope.selectedProjectDetails=selectedName;
 *  }
 * 
 * $scope.startTestProjectId=function(projectid){
 * console.dir("projectid"+projectid); }
 * 
 * 
 * 
 * });
 */

app
		.controller(
				'registerController',
				function($scope, $http, $state) {
					$scope.checkusername = function(name) {
						var data = name;
						// var name=document.getElementById( "UserName" ).value;
						console.log("username" + name);
						if (name === undefined) {
							document.getElementById("status").innerHTML = 'Username length(4-15) ';
						} else {

							if (name.length > 3) {
								$http
										.post('http://localhost:8087/register',
												data)
										.then(
												function(response) {
													console.log(response.data);
													if (response.data == 1) {
														document
																.getElementById("status").innerHTML = 'Username is not available';

													} else {
														document
																.getElementById("status").innerHTML = 'Username is available';
													}

												});
							}
						}

					};
					$scope.checkclientname = function(clientName) {
						/*
						 * const regex = /^[a-zA-Z0-9._@%:?]{8,}$/; const str
						 * ='dYh888877'; let m; console.log(regex.exec(str)); if
						 * ((m = regex.exec(str)) !== null) { // The result can
						 * be accessed through the `m`-variable.
						 * m.forEach((match, groupIndex) => { console.log(`Found
						 * match, group ${groupIndex}: ${match}`); }); } else{
						 * console.log("no match"); }
						 */

						var data = clientName;
						$http
								.post(
										'http://localhost:8087/register/clientName',
										data)
								.then(
										function(response) {
											console.log(response.data);
											if (response.data == 1) {
												document
														.getElementById("status1").innerHTML = 'ClientName is not available';

											} else {
												document
														.getElementById("status1").innerHTML = 'ClientName is available';
											}

										});

					}

					$scope.submitRegisterForm = function(fields) {
						var data = fields;
						console.log(data);
						$http.post('http://localhost:8087/register/save', data)
								.then(function(response) {
									console.log("true" + response.data);
									if (response.data == "success") {
										$state.go('login');
									} else {
										$state.go('register');
									}
								});
					}

				});

app
		.controller(
				'projectDetailsController',
				function($rootScope, $scope, $http, $state) {
					
					
					
					
					$rootScope.subCategoryArray = [];
					$rootScope.Comments = {
						'Continous Delivery' : [],
						'Infrastructure on Demand' : [],
						'Culture' : [],
						'Microservices' : []
					};
					$rootScope.SelectedMaturityLevel = {
						'Dev Quality' : [],
						'Unit Testing' : [],
						'Build' : [],
						'Deploy' : [],
						'NFR (Non Func Req) Testing' : [],
						'Automated Testing' : [],
						'Project Release Strategy' : [],
						'Testing Gates' : [],
						'DB Versioning & Change Management' : [],
						'Performance Regression Test' : [],
						'Functional Regression Test' : [],
						'Package and Deploy' : [],
						'Checkout, Build and Unit test' : [],
						'Infrastructure Monitoring' : [],
						'Logging Insights' : [],
						'End User Monitoring' : [],
						'Application Performance Monitoring' : [],
						'Infrastructure Code and Configuration' : [],
						'Automated Provisioning' : [],
						'Immutable Infrastructure' : [],
						'Project Collaboration & Community' : [],
						'Service Desk' : [],
						'Overall Release Management' : [],
						'Application Release Strategy' : [],
						'Data Release Strategy' : [],
						'Team Collaboration' : [],
						'Deployment Frequency (test/stage/prod)' : [],
						'Change Lead Time' : [],
						'Change Failure Rate' : [],
						'Mean Time To Recover (MTTR)' : [],
						'Design Principles' : [],
						'Database Independence' : [],
						'Integration' : [],
						'Independent Build Infrastructure' : [],
						'Independent Deployments' : [],
						'Versioning' : [],
						'Immutable Infrastructure' : []
					};
					$rootScope.commentName = {
						'Dev Quality' : [],
						'Unit Testing' : [],
						'Build' : [],
						'Deploy' : [],
						'NFR (Non Func Req) Testing' : [],
						'Automated Testing' : [],
						'Project Release Strategy' : [],
						'Testing Gates' : [],
						'DB Versioning & Change Management' : [],
						'Performance Regression Test' : [],
						'Functional Regression Test' : [],
						'Package and Deploy' : [],
						'Checkout, Build and Unit test' : [],
						'Infrastructure Monitoring' : [],
						'Logging Insights' : [],
						'End User Monitoring' : [],
						'Application Performance Monitoring' : [],
						'Infrastructure Code and Configuration' : [],
						'Automated Provisioning' : [],
						'Immutable Infrastructure' : [],
						'Project Collaboration & Community' : [],
						'Service Desk' : [],
						'Overall Release Management' : [],
						'Application Release Strategy' : [],
						'Data Release Strategy' : [],
						'Team Collaboration' : [],
						'Deployment Frequency (test/stage/prod)' : [],
						'Change Lead Time' : [],
						'Change Failure Rate' : [],
						'Mean Time To Recover (MTTR)' : [],
						'Design Principles' : [],
						'Database Independence' : [],
						'Integration' : [],
						'Independent Build Infrastructure' : [],
						'Independent Deployments' : [],
						'Versioning' : [],
						'Immutable Infrastructure' : []
					};

					
					
					
					
					$scope.submitNewProjectForm = function(projectObj) {

						console.dir(projectObj);
						$http.post('http://localhost:8087/login', projectObj);
						alert("Added the Project");

					};

					console.log("projectDetails length"
							+ $rootScope.projectDetails.projects.length);
					$scope.projectNames = [];
					var obj = {
						name : '',
						projectId : '',
						buisnessVertical : '',
						devTeamSize : '',
						qaTeamSize : ''
					};
					for (var i = 0; i < $rootScope.projectDetails.projects.length; i++) {
						obj = {
							testId : '',
							name : '',
							projectId : '',
							buisnessVertical : '',
							devTeamSize : '',
							qaTeamSize : ''
						};
						obj.testId = $rootScope.projectDetails.projects[i].testId;
						obj.name = $rootScope.projectDetails.projects[i].projectName;
						obj.projectId = $rootScope.projectDetails.projects[i].project_id.id;
						obj.buisnessVertical = $rootScope.projectDetails.projects[i].buisnessVertical;
						obj.devTeamSize = $rootScope.projectDetails.projects[i].devTeamSize;
						obj.qaTeamSize = $rootScope.projectDetails.projects[i].qaTeamSize;

						$scope.projectNames.push(obj);
						console.dir(obj);
					}
					$scope.clientDetails = [];
					var obj2 = {
						Client_id : '',
						Client_name : '',
						Username : '',
						Password : '',
						Email : ''
					}
					obj2.Client_id = $rootScope.projectDetails.Client_id.id;
					obj2.Client_name = $rootScope.projectDetails.Client_name;
					obj2.Username = $rootScope.projectDetails.Username;
					obj2.Password = $rootScope.projectDetails.Password;
					obj2.Email = $rootScope.projectDetails.Email;
					$scope.clientDetails.push(obj2);
					console.dir(obj2);
					$scope.rngESUS = Math.round((Math.random() * 10) * 10);
					console.dir("project" + $scope.rngESUS);

					$scope.projectDetailsFunction = function(selectedName) {
						console.dir("inside view project");
						console.log(selectedName);
						$scope.selectedProjectDetails = {};
						$scope.selectedProjectDetails = selectedName;

					}
					$scope.startTestProjectId = function(projectid) {
						console.dir("projectid" + projectid);
						$rootScope.projectidTest = projectid;
						$state.go('form.profile');
					}
					$scope.modifyTestProjectId = function(projectid) {
						console.dir("projectid" + projectid);
						$rootScope.projectidTest = projectid;
						/*$http.get('http://localhost:8087/assessment/'+$rootScope.projectidTest)
						.then(
								function(response) {
									console.dir(response.data);
									$rootScope.rootArea = response.data;
									console.dir($rootScope.rootArea);
								});
						for (var i = 0; i < $rootScope.rootArea.length; i++) {
							for(var k=0;k<$rootScope.rootArea[i].categories.length;k++)
							{
							for(var p=0;p<$rootScope.rootArea[i].categories[k].subCategories.length;p++)
								{
								console.dir("maturity level after modified"+$rootScope.rootArea[i].categories[k].subCategories[p].maturityLevel);
								if($rootScope.rootArea[i].categories[k].subCategories[p].maturityLevel!=null)
									{
									$rootScope.selectedname[subCategories[p].name]=$rootScope.rootArea[i].categories[k].subCategories[p].maturityLevel;
									console.dir($rootScope.selectedname[subCategories[p].name]);
									}
								}
							}
						}*/
						$state.go('form.profile');
					}

					$scope.submitAddProjectForm = function(fields) {
						var data = fields;
						console.log("inside add project" + data);
					}

				});
