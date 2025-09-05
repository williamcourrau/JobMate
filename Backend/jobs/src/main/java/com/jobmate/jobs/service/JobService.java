package com.jobmate.jobs.service;

import com.jobmate.jobs.model.Job;
import com.jobmate.jobs.repository.JobRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobService {
    private final JobRepository jobRepository;

    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public Optional<Job> getJobById(Long id) {
        return jobRepository.findById(id);
    }

    public Job createJob(Job job) {
        return jobRepository.save(job);
    }

    public Job updateJob(Long id, Job updatedJob) {
        return jobRepository.findById(id)
                .map(job -> {
                    job.setDescription(updatedJob.getDescription());
                    job.setLink(updatedJob.getLink());
                    job.setAppliedDate(updatedJob.getAppliedDate());
                    job.setLastUpdate(updatedJob.getLastUpdate());
                    job.setSalaryMin(updatedJob.getSalaryMin());
                    job.setSalaryMax(updatedJob.getSalaryMax());
                    job.setJobState(updatedJob.getJobState());
                    job.setJobTitle(updatedJob.getJobTitle());
                    job.setUserId(updatedJob.getUserId());
                    return jobRepository.save(job);
                })
                .orElseThrow(() -> new RuntimeException("Job not found with id " + id));
    }

    public void deleteJob(Long id) {
        jobRepository.deleteById(id);
    }
}
