                <!-- Blog Post -->
                <?php                
                  $sql = "SELECT * FROM articles WHERE id = " . (int)$_GET['id'] . " LIMIT 0,1";
                  $res = $base->select_sql($sql);
                ?>
                <!-- Title -->
                <h4><?php echo $res[0]->title;?></h4>

                <!-- Author -->
                <p>
                  <?php 
                    if((int)$res[0]->author_show==1){                
                      echo '<a href="#">';
                      echo $res[0]->author;
                      echo '</a>&nbsp;&nbsp;';
                    }
                  ?>
                  <span class="glyphicon glyphicon-time"></span>&nbsp;Posted on August 24, 2013 at 9:00 PM</p>
                <hr>

                <!-- Preview Image -->
                <!--<img class="img-responsive" src="http://placehold.it/900x300" alt="">-->


                <!-- Post Content -->
                <p class="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, vero, obcaecati, aut, error quam sapiente nemo saepe quibusdam sit excepturi nam quia corporis eligendi eos magni recusandae laborum minus inventore?</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, doloribus, dolorem iusto blanditiis unde eius illum consequuntur neque dicta incidunt ullam ea hic porro optio ratione repellat perspiciatis. Enim, iure!</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, nostrum, aliquid, animi, ut quas placeat totam sunt tempora commodi nihil ullam alias modi dicta saepe minima ab quo voluptatem obcaecati?</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, dolor quis. Sunt, ut, explicabo, aliquam tenetur ratione tempore quidem voluptates cupiditate voluptas illo saepe quaerat numquam recusandae? Qui, necessitatibus, est!</p>
                
                

               <hr>

                <!-- Blog Comments -->

                <!-- Comments Form -->
                <div class="well">
                  <h4>Leave a Comment:</h4>
                  <form role="form">
                    <div class="form-group">
                        <textarea class="form-control" rows="3"></textarea>
                    </div>
                    <button id="button_leave_comment" type="button" class="btn btn-primary">Submit</button>
                  </form>
                </div>
                <hr>

                <!-- Posted Comments -->

                <!-- Comment -->
                <div class="media">
                    <a class="pull-left" href="#">
                        <!--<img class="media-object" src="http://placehold.it/64x64" alt="">-->
                    </a>
                    <div class="media-body">
                        <h4 class="media-heading">Start Bootstrap
                            <small>August 25, 2014 at 9:30 PM</small>
                        </h4>
                        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                    </div>
                </div>

                <!-- Comment -->
                <div class="media">
                    <a class="pull-left" href="#">
                        <!--<img class="media-object" src="http://placehold.it/64x64" alt="">-->
                    </a>
                    <div class="media-body">
                        <h4 class="media-heading">Start Bootstrap
                            <small>August 25, 2014 at 9:30 PM</small>
                        </h4>
                        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                        <!-- Nested Comment -->
                        <div class="media">
                            <a class="pull-left" href="#">
                                <!--<img class="media-object" src="http://placehold.it/64x64" alt="">-->
                            </a>
                            <div class="media-body">
                                <h4 class="media-heading">Nested Start Bootstrap
                                    <small>August 25, 2014 at 9:30 PM</small>
                                </h4>
                                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                            </div>
                        </div>
                        <!-- End Nested Comment -->
                    </div>
                </div>