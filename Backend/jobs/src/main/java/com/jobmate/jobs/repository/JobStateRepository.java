package com.jobmate.jobs.repository;

import com.jobmate.jobs.model.JobState;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobStateRepository extends JpaRepository<JobState, Long> {
}
