import React from "react";
import editIcon from "../../assets/images/edit-gray.svg";
import iconplus from "../../assets/images/icon-plus.svg";
import linked from "../../assets/images/icon-linked-new.png";
import git from "../../assets/images/icon-git.png";

import pintest from "../../assets/images/icon-printest-new.png";

const Projects = ({
	info,
	isShowProjectModal,
	setIsShowProjectModal,
	projectCurrentInfo,
	setProjectCurrentInfo,
}) => {
	return (
		<div className=" about-container py-3 ">
			<h5 className="mb-3">Projects</h5>

			<img
				onClick={() => setIsShowProjectModal(true)}
				src={iconplus}
				className="edit-add"
			/>
			<div className="project-list">
				<ul>
					{info?.map((pro) => (
						<li>
							<div className="top-information">
								<h4>
									<span></span>
									{pro?.title}
								</h4>
								<div className="project-share">
									<ul className="share-listing">
										<li>
											<a href="">
												<img src={linked} />
											</a>
										</li>
										<li>
											<a href="">
												<img src={pintest} />
											</a>
										</li>
										<li>
											<a href="">
												<img src={git} />
											</a>
										</li>
									</ul>
								</div>
							</div>
							<div className="top-discription-text">
								<p>{pro?.about}</p>
							</div>
							<img
								onClick={() => {
									setProjectCurrentInfo(pro);
									setIsShowProjectModal(true);
								}}
								src={editIcon}
								className="edit-icons"
							/>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Projects;
