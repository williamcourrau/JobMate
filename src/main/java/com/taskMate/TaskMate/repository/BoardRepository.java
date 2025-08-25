package com.taskMate.TaskMate.repository;

import com.taskMate.TaskMate.model.Board;
import com.taskMate.TaskMate.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
    List<Board> findByOwner(User user);
    List<Board> findByOwnerId(Long id);
}
